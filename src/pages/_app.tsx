import { CartProvider } from '@/components/ShoppingCart/CartContext';
import { ToastContainer, ToastPosition } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';

export default function App({ Component, pageProps }: AppProps) {
  const [notificationPosition, setNotificationPosition] = useState<ToastPosition>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setNotificationPosition('bottom-center');
      else setNotificationPosition('top-right');
    };

    setNotificationPosition(window.innerWidth < 600 ? 'bottom-center' : 'top-right');

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex-1 flex">
          <Component {...pageProps} />
        </div>
        <ToastContainer position={notificationPosition} />
        {/* <Footer /> */}
      </div>
    </CartProvider>
  );
}
