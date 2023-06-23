import { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import { toast } from 'react-toastify';
import { constants } from '@/cfg/config';

export const CartButtons = () => {
  const shoppingCart = useContext(CartContext);

  const onClear = () => {
    if (!shoppingCart || shoppingCart.cartItems.length === 0) {
      toast('The shopping cart is already empty.', {
        type: 'error',
        autoClose: 1400,
      });
      return;
    }

    shoppingCart?.clearCart();
    toast('Shopping cart cleared.', {
      type: 'success',
      autoClose: 1400,
    });
  };

  return (
    <div className="flex flex-row justify-between items-end">
      <button
        aria-label="clear cart button"
        className="bg-gray-500 hover:bg-gray-600 text-white rounded-md py-3 px-5"
        onClick={onClear}
      >
        Clear
      </button>

      <div className=" w-full max-w-[150px]">
        <progress
          aria-label="product count progress bar"
          className={`max-w-[150px] 
            [&::-webkit-progress-bar]:rounded-md 
            [&::-webkit-progress-value]:rounded-md 
          [&::-webkit-progress-bar]:bg-slate-300 
          ${
            shoppingCart?.cartItems.length === 10
              ? '[&::-moz-progress-bar]:bg-red-400 [&::-webkit-progress-value]:bg-red-400'
              : '[&::-moz-progress-bar]:bg-blue-400 [&::-webkit-progress-value]:bg-blue-400'
          }
          `}
          value={shoppingCart?.cartItems.length}
          max={constants.MAX_CART_ITEMS}
        />

        <button
          disabled={shoppingCart?.cartItems.length === 0}
          aria-label="checkout button"
          className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-600 disabled:bg-gray-400 font-bold w-full"
          onClick={() => shoppingCart?.setOrderConfirmation(true)}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};
