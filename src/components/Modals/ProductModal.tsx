import { Dialog } from '@headlessui/react';
import { ProductForm } from '../Forms/ProductForm';
import { useModals } from '../../hooks/useModals';
import { FC } from 'react';
import { useProductsContext } from '../../hooks/useItemsContext';

export const ProductModal: FC = () => {
  const { selectedProduct } = useProductsContext();
  const { isProductModalOpen: isOpen, closeProductModal: closeItemModal } =
    useModals();

  return (
    <Dialog open={isOpen} onClose={closeItemModal} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-end">
            <button type="button" onClick={closeItemModal} className="p-2">
              <i className="fas fa-times"></i>
            </button>
          </div>
          <Dialog.Title as="h2" className="text-center font-bold text-xl mb-4">
            {selectedProduct?.name ? 'Editar Producto' : 'Agregar Producto'}
          </Dialog.Title>
          <ProductForm />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
