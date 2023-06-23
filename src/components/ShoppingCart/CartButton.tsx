import ShoppingCartIcon from '@/svg/ShoppingCartIcon';
import { CartContext } from './CartContext';
import { HTMLProps, useContext } from 'react';

interface CartButtonProps extends HTMLProps<HTMLDivElement> {}

export const CartButton = ({ onClick, className, ...props }: CartButtonProps) => {
  const shoppingCart = useContext(CartContext);

  return (
    <div {...props} className={`${className} relative flex flex-col justify-center max-w-[80px]`}>
      <button
        className="bg-blue-800 hover:bg-blue-700 rounded-md px-8 py-3 w-full"
        onClick={() => shoppingCart?.setCartOpen(true)}
        aria-label="open shopping cart button"
      >
        <ShoppingCartIcon className="fill-white scale-150 w-full" />
      </button>

      <div
        className="absolute flex items-center justify-center rounded-full bg-orange-600 text-white text-bold text-xs top-[-8px] right-[-5px] h-6 w-6"
        aria-label="amount of products in cart"
      >
        {shoppingCart?.cartItems.length}
      </div>

      {shoppingCart?.cartItems.length !== undefined && shoppingCart?.cartItems.length > 0 && (
        <div
          className="flex items-center justify-center rounded-full bg-sky-600 text-white text-bold text-xs p-[2px] mt-1"
          aria-label="cart total sum"
        >
          {shoppingCart?.calculateTotals().gross.toFixed(2)}€
        </div>
      )}
    </div>
  );
};
