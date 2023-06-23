import { Product } from '@/types/OrderTypes';
import ProductSelector from '@/components/ProductSelector';
import { CartContext } from '@/components/ShoppingCart/Context/CartContext';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import CheckoutConfirmation from '@/components/ShoppingCart/CheckoutConfirmation';
import CartDisplay from '@/components/ShoppingCart/CartDisplay';
import { iceImage } from '@/data/ice_image';

export interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  const context = useContext(CartContext);

  useEffect(() => {
    try {
      if (context) context.loadCart();
    } catch {}

    //eslint-disable-next-line
  }, []);

  return (
    <>
      <Head>
        <title>Rauhut24 Shop</title>
        <meta name="description" content="BIKE24 Challenge" />
        <meta name="keywords" content="shop, cart" />
      </Head>

      <main className="flex flex-col items-center w-full">
        <div className="w-full max-w-screen h-[35%] max-h-[200px] sm:max-h-[400px] overflow-hidden flex items-center pt-32">
          <Image
            src="/images/icy.jpg"
            placeholder="blur"
            blurDataURL={iceImage.dataUrl}
            alt="iceberg"
            width={4032}
            height={3024}
            className="w-screen scale-[2.4] sm:scale-100"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center px-4 w-full max-w-4xl mt-8 sm:mt-4 min-h-60%">
          <h2 className="mb-6 font-bold text-2xl hidden sm:block text-gray-700">
            Order our high quality products
          </h2>
          <ProductSelector products={products} />
        </div>

        <CartDisplay />

        {context?.orderConfirmation && (
          <CheckoutConfirmation onConfirm={() => context?.setOrderConfirmation(false)} />
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const res = await fetch(`${process.env.HOST}/api/v1/data`);
    const data = await res.json();

    return {
      props: {
        products: data,
      },
    };
  } catch (err) {
    console.error(err);
  }
}
