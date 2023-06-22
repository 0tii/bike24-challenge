import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext, CartContextType } from '@/components/ShoppingCart/CartContext';
import ShoppingCartComponent from '@/components/ShoppingCart/ShoppingCart';
import ShopOrderComponent from '@/components/ShopOrder';

describe('Shop Order and Shopping Cart', () => {
  it('adds an item from the shop order to the shopping cart', () => {
    const { getByRole, getByTestId, rerender } = render(
      <CartContext.Provider value={mockCartContext}>
        <ShopOrderComponent products={mockProducts} />
        <ShoppingCartComponent />
      </CartContext.Provider>
    );

    const table = getByRole('table');
    const rows = within(table).getAllByRole('row');

    // select an item and hit the 'add to cart' button
    const autocomplete = getByTestId('autocomplete');
    const input = getByRole('combobox');
    const slider = getByRole('slider');

    autocomplete.focus();

    fireEvent.change(input, { target: { value: mockProducts[0].productName.slice(0, 4) } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    const maxAmount = mockProducts[0].maxAmount;
    fireEvent.change(slider, { target: { value: maxAmount - 1 } });

    const buyButton = getByRole('button', { name: 'add to cart button' });
    fireEvent.click(buyButton);

    // mock rerender after state update
    rerender(
      <CartContext.Provider value={mockCartContext}>
        <ShopOrderComponent products={mockProducts} />
        <ShoppingCartComponent />
      </CartContext.Provider>
    );

    const newTable = getByRole('table');
    const newRows = within(newTable).getAllByRole('row');

    expect(newRows).toHaveLength(rows.length + 1);
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
