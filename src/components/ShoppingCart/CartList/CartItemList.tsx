import { CartContextType } from '../Context/CartContext';
import CartItem from './CartItem';

interface CartItemListProps {
  shoppingCart: CartContextType | null;
}

export const CartItemList = ({ shoppingCart }: CartItemListProps) => {
  return (
    <table className="w-full sm:text-base text-sm overflow-x-auto text-gray-700">
      <thead className="sm:text-base text-xs">
        <tr>
          <th className="text-start">Product</th>
          <th className="text-start max-w-[35px] sm:max-w-auto">
            <div className="whitespace-nowrap truncate w-full">Quantity</div>
          </th>
          <th className="text-start">Net</th>
          <th className="text-start">Gross</th>
          <th className="text-start">Total</th>
          <th className="text-start"></th>
        </tr>
      </thead>
      <tbody>
        {shoppingCart?.cartItems.map((item) => (
          <CartItem key={item.product.id} product={item.product} quantity={item.quantity} />
        ))}
      </tbody>
    </table>
  );
};

export default CartItemList;
