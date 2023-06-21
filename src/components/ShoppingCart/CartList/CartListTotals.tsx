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
  }, [shoppingCart?.cartItems, setPriceTotals, shoppingCart?.calculateTotals]);

  return (
    <div className="flex flex-row justify-end text-sm sm:text-base bg-gray-200 rounded-sm p-3 mt-2">
      <div>
        <div className="grid grid-cols-2">
          <span>Subtotal:</span>
          <span className="ml-3">{priceTotals?.net.toFixed(2)}€</span>
        </div>
        <div className="grid grid-cols-2">
          <span>Tax:</span>
          <span className="ml-3">{priceTotals?.tax.toFixed(2)}€</span>
        </div>
        <div className="grid grid-cols-2 font-bold">
          <span>Gross Total:</span>
          <span className="ml-3">{priceTotals?.gross.toFixed(2)}€</span>
        </div>
      </div>
    </div>
  );
};

export default CartListTotals;
