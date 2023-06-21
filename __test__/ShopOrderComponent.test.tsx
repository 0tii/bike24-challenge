import { render, fireEvent, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import ShopOrderComponent from '@/components/ShopOrderComponent';
import { CartContext } from '@/components/ShoppingCart/CartContext';

describe('Shop Order Component', () => {
  it('renders', () => {
    const container = render(<ShopOrderComponent products={products} />);

    expect(container).toMatchSnapshot();
  });

  it('enables the slider when a product is selected', () => {
    const { getByRole, getByTestId } = render(<ShopOrderComponent products={products} />);

    const autocomplete = getByTestId('autocomplete');
    const input = getByRole('combobox');
    const slider = getByRole('slider');

    autocomplete.focus();

    fireEvent.change(input, { target: { value: products[0].productName.slice(0, 4) } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    expect(slider).toBeEnabled();
  });

  it('does not allow exceeding the max quantity', () => {
    const { getByRole, getByTestId } = render(<ShopOrderComponent products={products} />);

    const autocomplete = getByTestId('autocomplete');
    const input = getByRole('combobox');
    const slider = getByRole('slider');

    autocomplete.focus();

    fireEvent.change(input, { target: { value: products[0].productName.slice(0, 4) } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    const maxAmount = products[0].maxAmount;
    fireEvent.change(slider, { target: { value: maxAmount + 1 } });
    const updatedValue = Number(slider.getAttribute('aria-valuenow'));

    expect(updatedValue).toBeLessThanOrEqual(maxAmount);
  });

  it('adds the item to the shopping cart', () => {
    const buy = jest.fn();

    const { getByRole, getByTestId } = render(
      <CartContext.Provider
        value={{
          addToCart: buy,
          calculateTotals: () => ({ net: 0, tax: 0, gross: 0 }),
          clearCart: () => {},
          cartItems: [],
          removeFromCart: () => {},
          loadCart: () => {},
          modifyItem: () => {},
        }}
      >
        <ShopOrderComponent products={products} />
      </CartContext.Provider>
    );

    const autocomplete = getByTestId('autocomplete');
    const input = getByRole('combobox');
    const slider = getByRole('slider');

    autocomplete.focus();

    fireEvent.change(input, { target: { value: products[0].productName.slice(0, 4) } });
    fireEvent.keyDown(autocomplete, { key: 'ArrowDown' });
    fireEvent.keyDown(autocomplete, { key: 'Enter' });

    const maxAmount = products[0].maxAmount;
    fireEvent.change(slider, { target: { value: maxAmount - 1 } });

    const buyButton = getByRole('button', { name: 'add-to-cart-button' });
    fireEvent.click(buyButton);

    expect(buy).toHaveBeenCalledWith(
      expect.objectContaining({
        productName: products[0].productName,
      }),
      2
    );
  });
});

// dummy products
const products = [
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
