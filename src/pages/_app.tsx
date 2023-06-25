import { CartProvider } from '@/components/ShoppingCart/Context/CartContext';
import { ToastContainer, ToastPosition } from 'react-toastify';
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import Header from '@/components/Header/Header';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary';
import ErrorComponent from '@/components/ErrorBoundary/ErrorComponent';

export default function App({ Component, pageProps }: AppProps) {
  const [notificationPosition, setNotificationPosition] = useState<ToastPosition>();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) setNotificationPosition('bottom-center');
      else setNotificationPosition('top-right');
    };

    setNotificationPosition(window.innerWidth < 600 ? 'bottom-center' : 'top-left');

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
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
    </ErrorBoundary>
  );
}
