import { CartProvider } from '@/components/ShoppingCart/CartContext';
import { ToastContainer } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
        <ToastContainer position={'bottom-center'} />
        {/* <Footer /> */}
      </div>
    </CartProvider>
  );
}
