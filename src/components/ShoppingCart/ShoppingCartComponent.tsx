import { Product } from "@/types/OrderTypes";
import { useContext, useEffect, useState } from "react";
import { CartContext, CartTotals } from "./CartContext";
import { constants } from "@/cfg/config";
import CartItemList from "./CartList/CartItemList";
import CartListTotals from "./CartList/CartListTotals";
import { toast } from "react-toastify";

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartComponentProps {
  // ...
}

const ShoppingCartComponent = ({}: ShoppingCartComponentProps) => {
  const shoppingCart = useContext(CartContext);

  const onClear = () => {
    if (!shoppingCart || shoppingCart.cartItems.length === 0) {
      toast("The shopping cart is already empty.", {
        type: "error",
        autoClose: 1400,
      });
      return;
    }

    shoppingCart?.clearCart();
    toast("Shopping cart cleared.", {
      type: "success",
      autoClose: 1400,
    });
  };

  return (
    <>
      <div>
        <CartItemList shoppingCart={shoppingCart} />
        <CartListTotals shoppingCart={shoppingCart} />
      </div>

      <div className="flex flex-row justify-between items-end">
        <button
          aria-label="clear cart button"
          className="bg-gray-500 hover:bg-gray-600 text-white rounded-md py-3 px-5"
          onClick={onClear}
        >
          Clear
        </button>
        <div className=" w-full max-w-[150px]">
          <progress
            aria-label="product count progress bar"
            className="max-w-[150px] [&::-webkit-progress-bar]:rounded-md [&::-webkit-progress-value]:rounded-md [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-blue-400 [&::-moz-progress-bar]:bg-blue-400"
            value={shoppingCart?.cartItems.length}
            max={constants.MAX_CART_ITEMS}
          />
          <button
            aria-label="checkout button"
            className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-600 disabled:bg-gray-400 font-bold w-full"
          >
            Checkout
          </button>
        </div>
      </div>
    </>
  );
};

export default ShoppingCartComponent;
