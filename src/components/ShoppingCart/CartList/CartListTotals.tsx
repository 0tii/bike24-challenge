import { useEffect, useState } from 'react';
import { CartContextType, CartTotals } from '../CartContext';

interface CartListTotalsProps {
  shoppingCart: CartContextType | null;
}

export const CartListTotals = ({ shoppingCart }: CartListTotalsProps) => {
  const [priceTotals, setPriceTotals] = useState<CartTotals>();

  useEffect(() => {
    if (!shoppingCart?.cartItems) return;

    setPriceTotals(shoppingCart?.calculateTotals());
  }, [shoppingCart?.cartItems, setPriceTotals, shoppingCart?.calculateTotals, shoppingCart]);

  return (
    <div className="flex flex-row justify-end text-sm sm:text-base bg-gray-100 rounded-sm p-3 my-4">
      <div>
        <div className="grid grid-cols-2 text-gray-600">
          <span>Subtotal:</span>
          <span className="ml-3 text-end">{priceTotals?.net.toFixed(2)}€</span>
        </div>
        <div className="grid grid-cols-2 text-gray-600">
          <span>Tax:</span>
          <span className="ml-3 text-end">{priceTotals?.tax.toFixed(2)}€</span>
        </div>
        <div className="grid grid-cols-2 font-bold">
          <span>Gross Total:</span>
          <span className="ml-3 text-end">{priceTotals?.gross.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};

export default CartListTotals;
