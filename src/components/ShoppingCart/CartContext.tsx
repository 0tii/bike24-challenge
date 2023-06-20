import { Product } from '@/types/OrderTypes';
import React, { PropsWithChildren, createContext, useState } from 'react';
import { constants } from '@/cfg/config';

export interface CartEntry {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartEntry[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  modifyItem: (itemId: string, newQuantity: number) => void;
  loadCart: () => void;
  calculateSum: () => string;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  /**
   * @throws Cart is full, Quantity exceeds allowed limit
   */
  const addToCart = (product: Product, quantity: number) => {
    if (cartItems.length >= constants.MAX_CART_ITEMS) throw 'The cart is full.';

    const itemIndex = cartItems.findIndex((item) => item.product.id === product.id);

    if (itemIndex === -1) {
      setCartItems((prevItems) => [...prevItems, { product: product, quantity: quantity }]);
    } else {
      const cartCopy = [...cartItems];
      if (cartCopy[itemIndex].quantity + quantity > product.maxAmount)
        throw 'Total quantity for this product exceeds allowed limit';

      cartCopy[itemIndex].quantity += quantity;
      setCartItems(cartCopy);
    }

    saveCart();
  };

  const calculateSum = () => {
    return cartItems
      .reduce((sum, currentObject) => {
        return sum + currentObject.product.price * currentObject.quantity;
      }, 0)
      .toFixed(2);
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== itemId));
  };

  /**
   * @throws Item could not be found
   */
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

  /**
   * @throws No cart available, Could not deserialize cart items
   */
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
    calculateSum,
  };

  return <CartContext.Provider value={cartContextValue}>{children}</CartContext.Provider>;
};
