import Link from 'next/link';
import { CartButton } from '../ShoppingCart/CartButton';

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-24 bg-blue-600">
      <Link href="/">
        <h1 className="text-4xl font-bold font-sans p-2 ml-4">
          <span className="text-white">Rauhut</span>
          <span className="text-orange-300">24</span>
        </h1>
      </Link>
      <div className="mr-4">
        <CartButton />
      </div>
    </div>
  );
};

export default Header;
