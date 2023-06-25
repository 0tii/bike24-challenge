import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from './Context/CartContext';
import { constants } from '@/cfg/config';
import CartItemList from './CartList/CartItemList';
import CartListTotals from './CartList/CartListTotals';
import { toast } from 'react-toastify';
import ClearShoppingCartIcon from '@/svg/ClearShoppingCartIcon';
import { CartButtons } from './CartList/CartButtons';

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartProps {
  // ...
}

const ShoppingCart = ({}: ShoppingCartProps) => {
  const shoppingCart = useContext(CartContext);

  return (
    <>
      <h2 className="my-6 font-bold text-4xl text-center text-gray-700">Your orders</h2>

      <CartItemList shoppingCart={shoppingCart} />

      {shoppingCart?.cartItems.length === 0 && (
        <div className="flex flex-col items-center my-8 text-gray-300 font-bold text-[2rem]">
          <span>Add products first</span>
          <ClearShoppingCartIcon className="fill-gray-300 h-24 w-24" />
        </div>
      )}

      <CartListTotals shoppingCart={shoppingCart} />

      <CartButtons />
    </>
  );
};

export default ShoppingCart;
