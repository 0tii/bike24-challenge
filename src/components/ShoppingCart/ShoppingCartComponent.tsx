import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from './CartContext';
import CartItem from './CartItem';

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
      </div>
      <div>
        <h2>Progressbar</h2>
      </div>
      <div className="flex flex-row justify-between">
        <button
          className="bg-gray-400 text-white rounded-md p-3"
          onClick={() => shoppingCart?.clearCart()}
        >
          Clear
        </button>
        <button className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-400 disabled:bg-gray-400 font-bold w-full max-w-[150px]">
          Checkout
        </button>
      </div>
    </>
  );
};

export default ShoppingCartComponent;
