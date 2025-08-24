import { useContext } from 'react';
import { ProductsContext } from '../components/Contexts/ItemsContext';
import { ModalsContext } from '../components/Contexts/ModalsContext';
import { useProductsContext } from './useItemsContext';

export function useModals() {
  const { selectedProduct, setSelectedProduct } = useProductsContext();
  const {
    isProductModalOpen,
    isUploadModalOpen,
    isCategoriesModalOpen,
    setIsProductModalOpen,
    setIsUploadModalOpen,
    setIsCategoriesModalOpen,
  } = useContext(ModalsContext);

  const openProductModal = () => {
    setIsUploadModalOpen(false);
    setIsCategoriesModalOpen(false);
    setIsProductModalOpen(true);
  };

  const closeProductModal = () => {
    if (selectedProduct) {
      setSelectedProduct(null);
    }
    setIsProductModalOpen(false);
  };

  const openUploadModal = () => {
    setIsCategoriesModalOpen(false);
    setIsProductModalOpen(false);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => setIsUploadModalOpen(false);

  const openCategoriesModal = () => {
    closeUploadModal();
    closeProductModal();
    setIsCategoriesModalOpen(true);
  };

  const closeCategoriesModal = () => {
    setIsCategoriesModalOpen(false);
  };

  return {
    isProductModalOpen,
    isUploadModalOpen,
    isCategoriesModalOpen,
    openProductModal,
    closeProductModal,
    openUploadModal,
    closeUploadModal,
    openCategoriesModal,
    closeCategoriesModal,
  };
}
