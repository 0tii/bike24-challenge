import { CartProvider } from '@/components/ShoppingCart/CartContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        {/* <Header /> */}
        <div className="flex-1">
          <Component {...pageProps} />
        </div>
        {/* <Footer /> */}
      </div>
    </CartProvider>
  );
}
