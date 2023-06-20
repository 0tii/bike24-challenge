import fs from 'fs';
import path from 'path';
import { Product } from '@/types/OrderTypes';
import ShopOrderComponent from '@/components/ShopOrderComponent';
import ShoppingCartComponent from '@/components/ShoppingCart/ShoppingCartComponent';

export interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  return (
    <main className="p-2 sm:p-8 flex flex-col gap-8 max-w-4xl">
      <ShopOrderComponent products={products} />
      <ShoppingCartComponent />
    </main>
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
