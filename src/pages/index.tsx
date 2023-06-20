import fs from 'fs';
import path from 'path';
import { Product } from '@/types/OrderTypes';
import ShopOrderComponent from '@/components/ShopOrderComponent';

export interface ShopProps {
  products: Product[];
}

export default function Shop({ products }: ShopProps) {
  return (
    <main className="p-24">
      <ShopOrderComponent products={products} />
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

  return {
    props: {
      products: productList,
    },
  };
}
