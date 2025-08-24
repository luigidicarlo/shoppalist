import { useEffect } from 'react';
import { v4 } from 'uuid';
import { Products } from './components/Products/Products';
import { Header } from './components/Header/Header';
import { FilterForm } from './components/Forms/FilterForm';
import { UploadModal } from './components/Modals/UploadModal';
import { ProductModal } from './components/Modals/ProductModal';
import { useProductsContext } from './hooks/useItemsContext';
import { useForm } from './hooks/useForm';
import { useModals } from './hooks/useModals';
import { ProductsTotal } from './components/Products/ProductsTotal';
import { AddItemButton } from './components/Buttons/AddItemButton';
import { CategoriesModal } from './components/Modals/CategoriesModal';

export const App = () => {
  const { products, categories, updateItem, addItem } = useProductsContext();

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  return (
    <>
      <main className="flex flex-col items-stretch">
        <div className="fixed w-full">
          <Header />
          <FilterForm />
          <ProductsTotal />
        </div>
        <div className="pt-36">
          <Products />
        </div>
        <AddItemButton />
      </main>
      <UploadModal />
      <ProductModal />
      <CategoriesModal />
    </>
  );
};
