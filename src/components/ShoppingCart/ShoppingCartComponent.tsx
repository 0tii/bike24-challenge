import { Product } from '@/types/OrderTypes';
import { useCallback, useContext } from 'react';
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
      {shoppingCart?.cartItems.map((item) => (
        <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
      ))}
    </>
  );
};

export default ShoppingCartComponent;
