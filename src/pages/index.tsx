import fs from 'fs';
import path from 'path';
import { Product } from '@/types/OrderTypes';
import ShopOrder from '@/components/ShopOrder';
import { CartContext } from '@/components/ShoppingCart/CartContext';
import { useContext, useEffect } from 'react';
import Head from 'next/head';
import CartDisplay from '@/components/ShoppingCart/CartDisplay';

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
      <main className="p-2 sm:p-8 flex flex-col gap-8 max-w-4xl">
        <ShopOrder className="mt-8" products={products} />
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
