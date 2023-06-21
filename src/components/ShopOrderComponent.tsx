import { Product } from '@/types/OrderTypes';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Slider } from '@mui/material';
import { useContext, useState } from 'react';
import { CartContext } from './ShoppingCart/CartContext';

export interface ShopOrderComponentProps {
  products: Product[];
}

const ShopOrderComponent = ({ products }: ShopOrderComponentProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);

  const shoppingCart = useContext(CartContext);

  const onProductChange = (product: Product | null) => {
    setSelectedProduct(product);
    setQuantity(0);
  };

  const addToCart = () => {
    try {
      if (!selectedProduct) throw 'Please select a product first.';

      shoppingCart?.addToCart(selectedProduct, quantity);

      setSelectedProduct(null);
      setQuantity(0);

      // TODO success notification
    } catch (err) {
      // TODO create notification
      console.warn(err);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-6 items-center w-full">
      <div className="w-full min-w-[30%]">
        <Autocomplete
          aria-label="searchbox"
          options={products}
          disablePortal
          renderInput={(params) => <TextField {...params} label="Select a Product" />}
          renderOption={(props, product) => {
            return (
              <li {...props} key={product.id}>
                {product.productName}
              </li>
            );
          }}
          getOptionLabel={(e) => e.productName}
          onChange={(evt, value) => onProductChange(value)}
          value={selectedProduct || null}
          sx={{ display: 'flex', width: '100%' }}
        />
      </div>

      <div className="w-full px-2">
        <label className="flex flex-col text-gray-600">
          Quantity
          <Slider
            aria-valuemin={0}
            aria-valuemax={selectedProduct?.maxAmount}
            aria-valuenow={quantity}
            aria-label="quantity"
            value={quantity}
            onChange={(evt, value) => setQuantity(value as number)}
            max={selectedProduct?.maxAmount}
            min={0}
            defaultValue={0}
            valueLabelDisplay="auto"
            disabled={selectedProduct === null}
            sx={{
              display: 'flex',
              borderRadius: '6px',
            }}
          />
        </label>
      </div>

      <div className="w-full flex flex-row items-center gap-3">
        <input
          aria-disabled
          aria-live="polite"
          aria-label="quantity-field"
          type="text"
          className="h-12 w-14 border-gray-400 border-[1.5px] rounded-md px-3 hover:border-gray-500 bg-transparent focus:outline-none"
          value={selectedProduct ? quantity : 0}
          readOnly
        />
        {selectedProduct && (
          <>
            <span>x</span>
            <span>{`${selectedProduct?.price}€`}</span>
            <span>=</span>
            <span>{`${((selectedProduct?.price || 0) * quantity).toFixed(2)}€`}</span>
          </>
        )}
      </div>

      <div className="flex items-center sm:min-w-[150px] max-h-[60px]">
        <button
          aria-label="add-to-cart-button"
          className="rounded-md bg-blue-500 text-white p-4 hover:bg-blue-400 disabled:bg-gray-400 font-bold w-full max-w-[150px]"
          disabled={selectedProduct === null || quantity <= 0}
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ShopOrderComponent;
