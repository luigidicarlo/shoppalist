import { Fragment, useState } from 'react';
import {
  buttonDangerStyles,
  buttonPrimaryStyles,
} from '../../constants/styles';
import { useProductsContext } from '../../hooks/useItemsContext';
import { Product } from '../../types/models/product';

interface IProps {
  product: Product;
  onEdit: (item: Product) => void;
}

export const ProductComponent: React.FC<IProps> = ({ product, onEdit }) => {
  const { getCategoryById, deleteItem } = useProductsContext();

  const onEditItem = () => {
    onEdit(product);
  };

  const onDeleteItem = () => {
    deleteItem(product.id);
  };

  return (
    <li className="shadow px-4 py-2 mb-4 rounded-md">
      <div className="flex items-center justify-between">
        <h3
          className={`my-0 text-lg select-none w-full font-bold${
            (product.price && Number(product.price) <= 0) ||
            (product.quantity && Number(product.quantity) <= 0)
              ? ' text-red-500'
              : ' text-gray-600'
          }`}
        >
          {product.name}
        </h3>
        <div className="flex items-center gap-4 pb-2">
          <button
            className="font-bold text-white bg-blue-500 h-8 w-8 rounded-lg flex items-center justify-center focus:outline-none"
            type="button"
            onClick={onEditItem}
          >
            <i className="fas fa-edit"></i>
          </button>
          <button
            type="button"
            className="font-bold text-white bg-red-500 h-8 w-8 rounded-lg flex items-center justify-center focus:outline-none"
            onClick={onDeleteItem}
          >
            <i className="fas fa-trash me-1"></i>
          </button>
        </div>
      </div>
      <Fragment>
        <hr />
        <div className="text-gray-600 pt-2">
          <p className="font-bold">{getCategoryById(product.categoryId!)}</p>
          <p>
            <small>Categoría</small>
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 pb-2 text-gray-600">
          <div className="flex flex-col">
            <p className="font-bold">{Number(product.price).toFixed(3)}</p>
            <p>
              <small>Precio</small>
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="font-bold">{Number(product.quantity).toFixed(3)}</p>
            <p>
              <small>Cantidad</small>
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="font-bold">
              {(Number(product.price) * Number(product.quantity)).toFixed(3)}
            </p>
            <p>
              <small>Subtotal</small>
            </p>
          </div>
        </div>
      </Fragment>
    </li>
  );
};
