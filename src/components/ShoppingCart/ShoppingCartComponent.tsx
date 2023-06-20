import { Product } from '@/types/OrderTypes';

export interface ShoppingCartItem {
  product: Product;
  quantity: number;
}

export interface ShoppingCartComponent {
  cartChanged: (products: ShoppingCartItem[], changedItem?: ShoppingCartItem) => void;
}

const ShoppingCartComponent = () => {
  // list of item orders
};

export default ShoppingCartComponent;
