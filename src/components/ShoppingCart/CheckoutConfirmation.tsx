import ShopSuccessIcon from '@/svg/ShopSuccessIcon';
import { useContext } from 'react';
import { CartContext } from './CartContext';

interface CheckoutConfirmationProps {
  onConfirm: () => void;
}

export const CheckoutConfirmation = ({ onConfirm }: CheckoutConfirmationProps) => {
  const cart = useContext(CartContext);
  return (
    <>
      <div className="absolute z-[19] w-screen h-screen top-0 left-0 bg-black/60" />
      <div className="z-20 absolute bg-emerald-300 border-green-100 border-[2px] w-full sm:w-[40%] sm:min-w-[200px] sm:max-w-[400px] h-[40%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <div className="flex flex-col w-full h-full justify-between items-center py-8">
          <h1 className=" font-bold text-xl">Thank you for your purchase!</h1>
          <ShopSuccessIcon className="w-24 h-24 fill-emerald-600" />
          <span className="font-semibold text-lg">
            <i>Continue shopping</i>
          </span>
          <button
            className="p-3 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => {
              onConfirm();
              cart?.clearCart();
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </>
  );
};

export default CheckoutConfirmation;
