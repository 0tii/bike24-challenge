import { render, fireEvent, within, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext, CartContextType } from '@/components/ShoppingCart/Context/CartContext';
import ShoppingCartComponent from '@/components/ShoppingCart/ShoppingCart';
import { CartButton } from '@/components/ShoppingCart/CartButton';
import CartDisplay from '@/components/ShoppingCart/CartDisplay';

describe('Shopping Cart Button and Cart Display', () => {
  it('opens the cart display on button click', () => {
    const { getByTestId, rerender } = render(
      <CartContext.Provider value={mockCartContext}>
        <CartButton />
        <CartDisplay />
      </CartContext.Provider>
    );

    const cartButton = getByTestId('cart-button');
    fireEvent.click(cartButton);

    rerender(
      <CartContext.Provider value={mockCartContext}>
        <CartButton />
        <CartDisplay />
      </CartContext.Provider>
    );

    const closeCartButton = getByTestId('close-cart-button');

    expect(closeCartButton).toBeInTheDocument();
  });

  it('closes the cart display on close-button click', () => {
    mockCartContext.cartOpen = true;

    const { getByTestId, queryByTestId, rerender } = render(
      <CartContext.Provider value={mockCartContext}>
        <CartButton />
        <CartDisplay />
      </CartContext.Provider>
    );

    const closeCartButton = getByTestId('close-cart-button');

    expect(closeCartButton).toBeInTheDocument();

    fireEvent.click(closeCartButton);

    rerender(
      <CartContext.Provider value={mockCartContext}>
        <CartButton />
        <CartDisplay />
      </CartContext.Provider>
    );

    const closeCartButtonAfterRerender = queryByTestId('close-cart-button');

    expect(closeCartButtonAfterRerender).not.toBeInTheDocument();
  });
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

const setOrderConfirmationMock = jest.fn((val) => (mockCartContext.orderConfirmation = val));

const setCartOpenMock = jest.fn((val) => (mockCartContext.cartOpen = val));

const mockCartContext: CartContextType = {
  cartItems: [
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 50 },
  ],
  addToCart: addToCartMock,
  removeFromCart: removeFromCartMock,
  clearCart: jest.fn(),
  modifyItem: jest.fn(),
  loadCart: jest.fn(),
  calculateTotals: jest.fn(() => ({
    net: 0,
    tax: 0,
    gross: 0,
  })),
  orderConfirmation: false,
  setOrderConfirmation: setOrderConfirmationMock,
  cartOpen: false,
  setCartOpen: setCartOpenMock,
};
