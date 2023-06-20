import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from './CartContext';

export interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const shoppingCart = useContext(CartContext);

  return (
    <div className="flex text-sm sm:text-base flex-row sm:gap-8 bg-slate-300 rounded-md sm:justify-between p-3 mt-2 items-center">
      <p className="w-[40%]">{product.productName}</p>
      <div className="flex flex-row flex-1 justify-between items-center">
        <p>{quantity} x</p>
        <p className="ml-3 sm:ml-0">{product.price}€</p>

        <div className="flex flex-row gap-4 items-center">
          <p className="ml-3 sm:ml-0">
            <b>{(quantity * product.price).toFixed(2)}€</b>
          </p>

          <button
            className="p-3  bg-red-500 rounded-md text-sm text-white ml-4"
            onClick={() => shoppingCart?.removeFromCart(product.id)}
          >
            ✘
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
