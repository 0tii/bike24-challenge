import { Product } from '@/types/OrderTypes';
import React, { PropsWithChildren, createContext, useState } from 'react';

export interface CartEntry {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartEntry[];
  addToCart: (item: Product, quantity: number) => boolean;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  modifyItem: (itemId: string, newQuantity: number) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  const addToCart = (item: Product, quantity: number) => {
    // TODO check maxAmount
    setCartItems((prevItems) => [...prevItems, { product: item, quantity: quantity }]);
    return true;
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== itemId));
  };

  const modifyItem = (itemId: string, newQuantity: number) => {
    // TODO To be implemented
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartContextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    modifyItem,
  };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
