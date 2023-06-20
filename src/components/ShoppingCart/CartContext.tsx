import { Product } from '@/types/OrderTypes';
import React, { PropsWithChildren, createContext, useState } from 'react';
import { constants } from '@/cfg/config';

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
  loadCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  const addToCart = (item: Product, quantity: number) => {
    if (cartItems.length >= constants.MAX_CART_ITEMS) throw 'The cart is full.';

    setCartItems((prevItems) => [...prevItems, { product: item, quantity: quantity }]);
    return true;
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== itemId));
  };

  const modifyItem = (itemId: string, newQuantity: number) => {
    const cartCopy = [...cartItems];
    const targetIndex = cartCopy.findIndex((item) => item.product.id === itemId);

    if (targetIndex === -1) throw 'The item could not be found.';

    cartCopy[targetIndex].quantity = newQuantity;
    setCartItems(cartCopy);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const saveCart = () => {
    localStorage.setItem('cart', Buffer.from(JSON.stringify(cartItems), 'utf8').toString('base64'));
  };

  const loadCart = () => {
    const b64 = localStorage.getItem('cart');
    if (!b64) throw 'No cart available.';
    try {
      const cart = JSON.parse(Buffer.from(b64, 'base64').toString('utf8'));
      setCartItems(cart);
    } catch (err) {
      throw 'Could not deserialize the cart items.';
    }
  };

  const cartContextValue: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    modifyItem,
    loadCart,
  };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
