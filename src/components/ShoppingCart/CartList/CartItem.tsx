import { Product } from '@/types/OrderTypes';
import { useContext } from 'react';
import { CartContext } from '../CartContext';
import TrashBinIcon from '@/svg/TrashBinIcon';
import { toast } from 'react-toastify';

export interface CartItemProps {
  product: Product;
  quantity: number;
}

export const CartItem = ({ product, quantity }: CartItemProps) => {
  const totalPrice = (quantity * product.price).toFixed(2);
  const shoppingCart = useContext(CartContext);

  const onDelete = () => {
    shoppingCart?.removeFromCart(product.id);
    toast(`Product ${product.productName} removed from cart.`, {
      type: 'success',
      autoClose: 1400,
    });
  };

  return (
    <tr>
      <td className="sm:py-2 py-1">{product.productName}</td>
      <td className="sm:py-2 py-1">{quantity}</td>
      <td className="sm:py-2 py-1">{product.price}€</td>
      <td className="sm:py-2 py-1">{totalPrice}€</td>
      <td className="sm:py-2 py-1">
        <div className="flex justify-end">
          <button className="bg-red-500 hover:bg-red-600 rounded-md sm:p-2 p-1" onClick={onDelete}>
            <TrashBinIcon className="fill-white sm:w-5 sm:h-5 w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
