import CartDisplay from '../ShoppingCart/CartDisplay';

export const Header = () => {
  return (
    <div className="flex flex-row items-center justify-between w-full h-24 bg-blue-600">
      <h1 className="text-4xl font-bold font-sans p-2 ml-4">
        <span className="text-white">Rauhut</span>
        <span className="text-orange-400">24</span>
      </h1>
      <div className="mr-4">
        <CartDisplay />
      </div>
    </div>
  );
};

export default Header;
