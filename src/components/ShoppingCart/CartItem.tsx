import { Product } from '@/types/OrderTypes';

export interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  return (
    <div className="flex flex-row gap-8">
      <p>{product.productName}</p>
      <p>{quantity}</p>
      <p>x {product.price}€</p>
      <p>= {(quantity * product.price).toFixed(2)}€</p>
    </div>
  );
};

export default CartItem;
