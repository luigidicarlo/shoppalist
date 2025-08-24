import { createContext, useState } from 'react';
import { ProductsContextValue } from '../../types/contexts/products-context-value';
import { Product } from '../../types/models/product';
import { Category } from '../../types/models/category';

export const ProductsContext = createContext<ProductsContextValue>({
  selectedProduct: null,
  products: [],
  categories: [],
  filteredProducts: [],
  filter: '',
  setSelectedProduct: () => {},
  setFilteredProducts: () => {},
  setProducts: () => {},
  setFilter: () => {},
  setCategories: () => {},
});

interface IProps {
  children: React.ReactNode;
}

export const ItemsProvider: React.FC<IProps> = ({ children }) => {
  const rawItems = localStorage.getItem('items');
  const rawCategories = localStorage.getItem('categories');

  const defaultCategories = rawCategories ? JSON.parse(rawCategories) : [];
  const defaultItems = rawItems ? JSON.parse(rawItems) : [];

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>(defaultItems);
  const [categories, setCategories] = useState<Category[]>(defaultCategories);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filter, setFilter] = useState('');

  return (
    <ProductsContext.Provider
      value={{
        selectedProduct,
        setSelectedProduct,
        products,
        setProducts,
        categories,
        setCategories,
        filteredProducts,
        setFilteredProducts,
        filter,
        setFilter,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
