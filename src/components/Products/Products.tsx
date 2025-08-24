import { FC } from 'react';
import { useProductsContext } from '../../hooks/useItemsContext';
import { useModals } from '../../hooks/useModals';
import { Product } from '../../types/models/product';
import { ProductComponent } from './Product';

export const Products: FC = () => {
  const { filteredProducts, setSelectedProduct } = useProductsContext();
  const { openProductModal } = useModals();

  const onEdit = (product: Product) => {
    setSelectedProduct(product);
    openProductModal();
  };

  return (
    <ul
      className={`rounded flex-1 overflow-y-auto w-full px-4${
        filteredProducts.length > 0 && ' pb-12'
      }`}
    >
      {!filteredProducts.length && (
        <li className="flex items-center justify-center first:pt-12">
          <h2 className="text-2xl font-bold text-center">
            No hay elementos para mostrar
          </h2>
        </li>
      )}
      {filteredProducts.length > 0 &&
        filteredProducts.map((product) => (
          <ProductComponent
            product={product}
            key={product.id}
            onEdit={onEdit}
          />
        ))}
    </ul>
  );
};
