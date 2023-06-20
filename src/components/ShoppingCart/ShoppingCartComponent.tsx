import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import CartItem from './CartItem';
import { constants } from '@/cfg/config';

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartComponentProps {
  // ...
}

const ShoppingCartComponent = ({}: ShoppingCartComponentProps) => {
  const shoppingCart = useContext(CartContext);

  return (
    <>
      <div>
        {shoppingCart?.cartItems.map((item) => (
          <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
        ))}
        <span className="float-right">
          <b>Total: {shoppingCart?.calculateSum()}€</b>
        </span>
      </div>
      <div className="flex flex-row justify-between items-end">
        <button
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-md py-3 px-5"
          onClick={() => shoppingCart?.clearCart()}
        >
          Clear
        </button>
        <div className=" w-full max-w-[150px]">
          <progress
            className="max-w-[150px] [&::-webkit-progress-bar]:rounded-md [&::-webkit-progress-value]:rounded-md [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-blue-400"
            value={shoppingCart?.cartItems.length}
            max={constants.MAX_CART_ITEMS}
          />
          <button className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-400 disabled:bg-gray-400 font-bold w-full">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartComponent;
