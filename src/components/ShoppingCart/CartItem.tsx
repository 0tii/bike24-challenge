import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import TrashBinIcon from '@/svg/TrashBinIcon';

export interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const shoppingCart = useContext(CartContext);

  return (
    <div className="grid grid-cols-[40%_auto] text-sm sm:text-base bg-slate-300 rounded-md p-3 mt-2">
      <span>{product.productName}</span>
      <div className="flex flex-row flex-1 justify-between">
        <span>{quantity}</span>
        <span>{product.price}€</span>
        <span>
          <b>{(quantity * product.price).toFixed(2)}€</b>
        </span>
        <button
          className="bg-red-500 hover:bg-red-600 rounded-md p-2"
          onClick={() => shoppingCart?.removeFromCart(product.id)}
        >
          <TrashBinIcon className=" fill-white w-5 h-5 stroke-2" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
