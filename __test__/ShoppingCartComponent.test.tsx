import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartContext, CartContextType } from '@/components/ShoppingCart/CartContext';
import ShoppingCartComponent from '@/components/ShoppingCart/ShoppingCartComponent';

describe('Shopping Cart Component', () => {
  it('renders', () => {
    const container = render(
      <CartContext.Provider value={mockCartContext}>
        <ShoppingCartComponent />
      </CartContext.Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('renders all elements in the cart as table rows', () => {
    const { getByRole } = render(
      <CartContext.Provider value={mockCartContext}>
        <ShoppingCartComponent />
      </CartContext.Provider>
    );

    const table = getByRole('table');
    const rows = within(table).getAllByRole('row');

    expect(rows).toHaveLength(mockCartContext.cartItems.length + 1);
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

const mockCartContext: CartContextType = {
  cartItems: [
    { product: mockProducts[0], quantity: 2 },
    { product: mockProducts[1], quantity: 50 },
  ],
  addToCart: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  modifyItem: jest.fn(),
  loadCart: jest.fn(),
  calculateTotals: jest.fn(),
};
