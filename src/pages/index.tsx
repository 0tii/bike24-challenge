import fs from 'fs';
import path from 'path';
import { Product } from '@/types/OrderTypes';
import ShopOrder from '@/components/ShopOrder';
import { CartContext } from '@/components/ShoppingCart/CartContext';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import CheckoutConfirmation from '@/components/ShoppingCart/CheckoutConfirmation';

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
            alt="iceberg"
            width={4032}
            height={3024}
            className="w-screen scale-[2.4] sm:scale-100"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col items-center px-4 w-full max-w-4xl mt-8 sm:mt-4 min-h-60%">
          <h2 className="mb-6 font-bold text-2xl hidden sm:block">
            Order our high quality products
          </h2>
          <ShopOrder products={products} />
        </div>
        {context?.orderConfirmation && (
          <CheckoutConfirmation onConfirm={() => context?.setOrderConfirmation(false)} />
        )}
      </main>
    </>
  );
}

// We use SSG for now since we have the data available locally
// If i find the time I will refactor this to use a more traditional approach of SSR fetching from an API route
export function getStaticProps() {
  const jsonFileContent = fs.readFileSync(
    path.join(process.cwd(), 'src/data/products.json'),
    'utf-8'
  );
  const productList = JSON.parse(jsonFileContent);
  1;

  return {
    props: {
      products: productList,
    },
  };
}
