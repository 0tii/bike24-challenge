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
  const [selectedItem, setSelectedItem] = useState<Product | null>();
  const [amount, setAmount] = useState(0);

  const onProductChange = (product: Product | null) => {
    setSelectedItem(product);
    setAmount(0);
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
        <h3>Amount</h3>
        <Slider
          aria-label="amount"
          value={amount}
          onChange={(evt, value) => setAmount(value as number)}
          max={selectedItem?.maxAmount}
          min={0}
          defaultValue={0}
          valueLabelDisplay="auto"
          disabled={selectedItem === null}
          sx={{
            width: '100px',
          }}
        />
      </div>

      <div className="flex flex-row items-center gap-4">
        <input
          type="text"
          className="h-12 w-12 border-gray-400 border-[1.5px] rounded-sm pl-4 hover:border-gray-500 bg-transparent"
          value={selectedItem ? amount : 0}
        />
        <p className="tracking-wide">{selectedItem ? `x ${selectedItem.price}€` : ''}</p>
        <p>{selectedItem && `= ${(selectedItem.price * amount).toFixed(2)}€`}</p>
      </div>

      <button
        className="rounded-sm bg-blue-500 text-white p-4 hover:bg-blue-400 disabled:bg-gray-400 font-bold"
        disabled={selectedItem === null || amount <= 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ShopOrderComponent;
