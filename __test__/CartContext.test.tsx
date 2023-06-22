import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ShopOrderComponent from '@/components/ShopOrderComponent';
import {
  CartContext,
  CartContextType,
  CartEntry,
  CartProvider,
} from '@/components/ShoppingCart/CartContext';
import { useContext, useEffect } from 'react';
import { Product } from '@/types/OrderTypes';
import { comment } from 'postcss';

describe('The Cart Context', () => {
  it('should add items to the cart', () => {
    render(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="add" />
      </CartProvider>
    );

    expect(screen.getByText(`${mockProducts[0].productName} - ${1}`)).toBeInTheDocument();
  });

  it('should remove items from the cart', () => {
    // need to add product first
    const { rerender } = render(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="add" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${1}`)).not.toBeNull();

    rerender(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="remove" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${1}`)).toBeNull();
  });

  it('should modify items in the cart', () => {
    // need to add product first
    const { rerender } = render(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="add" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${1}`)).not.toBeNull();

    rerender(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={3} action="modify" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${3}`)).not.toBeNull();
  });

  it('can clear the cart', () => {
    // need to add product first
    const { rerender } = render(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="add" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${1}`)).not.toBeNull();

    rerender(
      <CartProvider>
        <TestComponent product={mockProducts[0]} quantity={1} action="clear" />
      </CartProvider>
    );

    expect(screen.queryByText(`${mockProducts[0].productName} - ${1}`)).toBeNull();
  });

  const TestComponent = ({
    product,
    quantity,
    action,
  }: {
    product: Product;
    quantity: number;
    action: 'add' | 'remove' | 'modify' | 'clear';
  }) => {
    const { addToCart, removeFromCart, modifyItem, clearCart, cartItems } =
      useContext(CartContext)!;

    useEffect(() => {
      switch (action) {
        case 'add':
          addToCart(product, quantity);
          break;
        case 'remove':
          removeFromCart(product.id);
          break;
        case 'modify':
          modifyItem(product.id, quantity);
          break;
        case 'clear':
          clearCart();
          break;
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [action]);

    return (
      <div>
        {cartItems.map((item: CartEntry) => (
          <div key={item.product.id}>
            {item.product.productName} - {item.quantity}
          </div>
        ))}
      </div>
    );
  };
});

const mockProducts = [
  {
    id: '8e3973e3-e43e-4370-bfcc-3b84d72bb77d',
    productName: 'Syrup - Monin, Irish Cream',
    maxAmount: 3,
    taxRate: 7,
    price: 7.76,
  },
  {
    id: 'e713cc29-9074-49f1-9e9c-d7b340fac027',
    productName: 'Pie Shells 10',
    maxAmount: 94,
    taxRate: 7,
    price: 9.45,
  },
  {
    id: '4f6dff49-9731-4bfa-9e67-854238328a80',
    productName: 'Wine - Trimbach Pinot Blanc',
    maxAmount: 17,
    taxRate: 7,
    price: 14.31,
  },
];

const removeFromCartMock = jest.fn((id) => {
  mockCartContext.cartItems = mockCartContext.cartItems.filter((e) => e.product.id !== id);
});

const addToCartMock = jest.fn((product, amount) => {
  mockCartContext.cartItems.push({ product: product, quantity: amount });
});

const mockCartContext: CartContextType = {
  cartItems: [
    { product: mockProducts[1], quantity: 2 },
    { product: mockProducts[2], quantity: 50 },
  ],
  addToCart: addToCartMock,
  removeFromCart: removeFromCartMock,
  clearCart: jest.fn(),
  modifyItem: jest.fn(),
  loadCart: jest.fn(),
  calculateTotals: jest.fn(),
};
