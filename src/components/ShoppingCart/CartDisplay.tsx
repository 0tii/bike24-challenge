import { useState } from 'react';
import ShoppingCart from './ShoppingCart';
import { CartButton } from './CartButton';

export const CartDisplay = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <CartButton onClick={() => setExpanded((exp) => !exp)} aria-label="shopping cart button" />
      {expanded && (
        <>
          <div // backdrop
            className="absolute h-screen w-screen top-0 left-0 bg-[rgba(58,69,92,0.46)]"
          />

          <div
            className="slidein z-10 top-0 right-0 absolute md:w-[60%] md:max-w-[750px] w-full min-w-[350px] h-full bg-white overflow-y-auto overflow-x-hidden shadow-2xl"
            aria-label="shopping cart screen"
          >
            <div className="flex flex-col">
              <div
                className="bg-blue-800 w-full flex justify-end items-center"
                aria-label="cart header"
              >
                <button
                  className="text-white text-xl mr-5 py-3"
                  aria-label="close cart button"
                  onClick={() => setExpanded((exp) => !exp)}
                >
                  x
                </button>
              </div>
              <div className="w-full px-3">
                <ShoppingCart />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartDisplay;
