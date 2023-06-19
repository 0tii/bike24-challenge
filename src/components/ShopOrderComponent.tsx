'use client';

import { Product } from '@/types/OrderTypes';
import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Slider } from '@mui/material';
import { useState } from 'react';

export interface ShopOrderComponentProps {
  products: Product[];
}

const ShopOrderComponent = ({ products }: ShopOrderComponentProps) => {
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(0);

  const onProductChange = (product: Product | null) => {
    setSelectedItem(product);
    setQuantity(0);
  };

  const addToCart = () => {
    // add current product in current quantity to cart

    setSelectedItem(null);
    setQuantity(0);
  };

  return (
    <div className="flex flex-row gap-x-6 items-center">
      <Autocomplete
        aria-label="searchbox"
        options={products}
        disablePortal
        renderInput={(params) => <TextField {...params} label="Select a Product" />}
        getOptionLabel={(e) => e.productName}
        onChange={(evt, value) => onProductChange(value)}
        sx={{
          width: '300px',
        }}
      />

      <div>
        <label className="flex flex-col text-gray-600">
          Quantity
          <Slider
            aria-label="quantity"
            value={quantity}
            onChange={(evt, value) => setQuantity(value as number)}
            max={selectedItem?.maxAmount}
            min={0}
            defaultValue={0}
            valueLabelDisplay="auto"
            disabled={selectedItem === null}
            sx={{
              width: '100px',
            }}
          />
        </label>
      </div>

      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          className="h-12 w-14 border-gray-400 border-[1.5px] rounded-sm px-3 hover:border-gray-500 bg-transparent"
          value={selectedItem ? quantity : 0}
        />
        <p className="tracking-wide">{selectedItem ? `x ${selectedItem.price}€` : ''}</p>
        <p>{selectedItem && `= ${(selectedItem.price * quantity).toFixed(2)}€`}</p>
      </div>

      <button
        className="rounded-sm bg-blue-500 text-white p-4 hover:bg-blue-400 disabled:bg-gray-400 font-bold"
        disabled={selectedItem === null || quantity <= 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopOrderComponent;
