import { Product } from '@/types/OrderTypes';
import { useContext, useEffect, useState } from 'react';
import { CartContext, CartTotals } from './CartContext';
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
  const [priceTotals, setPriceTotals] = useState<CartTotals>();
  const shoppingCart = useContext(CartContext);

  useEffect(() => {
    if (!shoppingCart?.cartItems) return;

    setPriceTotals(shoppingCart?.calculateTotals());
  }, [shoppingCart?.cartItems, setPriceTotals, shoppingCart?.calculateTotals]);

  return (
    <>
      <div>
        <ul>
          {shoppingCart?.cartItems.map((item) => (
            <li key={item.product.id}>
              <CartItem product={item.product} quantity={item.quantity} />
            </li>
          ))}
        </ul>
        <div className="flex flex-row justify-end text-sm sm:text-base bg-slate-300 rounded-md p-3 mt-2">
          <div>
            <div className="grid grid-cols-2">
              <span>Subtotal:</span>
              <span className="px-2">{priceTotals?.net.toFixed(2)}€</span>
            </div>
            <div className="grid grid-cols-2">
              <span>Tax:</span>
              <span className="px-2">{priceTotals?.tax.toFixed(2)}€</span>
            </div>
            <div className="grid grid-cols-2">
              <span>
                <b>Total:</b>
              </span>
              <span className="px-2">
                <b>{priceTotals?.gross.toFixed(2)}€</b>
              </span>
            </div>
          </div>
        </div>
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
          <button className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-600 disabled:bg-gray-400 font-bold w-full">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartComponent;
