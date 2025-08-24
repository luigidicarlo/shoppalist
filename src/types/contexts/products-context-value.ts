import { Category } from '../models/category';
import { Product } from '../models/product';
import { ReactDispatch } from '../utils';

export type ProductsContextValue = {
  selectedProduct: Product | null;
  products: Product[];
  categories: Category[];
  filteredProducts: Product[];
  filter: string;
  setSelectedProduct: ReactDispatch<Product | null>;
  setProducts: ReactDispatch<Product[]>;
  setCategories: ReactDispatch<Category[]>;
  setFilteredProducts: ReactDispatch<Product[]>;
  setFilter: ReactDispatch<string>;
};
