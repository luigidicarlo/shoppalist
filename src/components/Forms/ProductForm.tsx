import { FC, useLayoutEffect, useRef } from 'react';
import { inputStyles } from '../../constants/styles';
import { Button, ButtonVariation } from '../Buttons/Button';
import { ProductFormState } from '../../types/forms/product-form-state';
import { useProductsContext } from '../../hooks/useItemsContext';
import { v4 } from 'uuid';
import { useModals } from '../../hooks/useModals';
import { useForm } from '../../hooks/useForm';
import { Product } from '../../types/models/product';

const defaultState: ProductFormState = {
  name: '',
  quantity: '',
  price: '',
  categoryId: '',
};

export const ProductForm: FC = () => {
  const { categories, updateItem, addItem, selectedProduct } =
    useProductsContext();
  const { closeProductModal } = useModals();
  const { formState, setFormState, resetForm } = useForm(
    selectedProduct || defaultState,
  );
  const nameInputRef = useRef<HTMLInputElement>(null);
  const categoryInputRef = useRef<HTMLSelectElement>(null);

  useLayoutEffect(() => {
    nameInputRef.current && nameInputRef.current.focus();
  }, []);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();

    const { name, quantity, price } = formState;
    const selectedCategoryId = categoryInputRef.current?.value ?? '';

    if (selectedProduct) {
      updateItem(selectedProduct.id, {
        id: selectedProduct.id,
        name: name.trim(),
        quantity: Number(quantity) ? String(Number(quantity)) : '1',
        price: String(Number(price)),
        categoryId: selectedCategoryId,
      });
    } else {
      const newItem: Product = {
        id: v4(),
        name: name.trim(),
        quantity: Number(quantity) ? String(Number(quantity)) : '1',
        price: String(Number(price)),
        categoryId: selectedCategoryId,
      };
      addItem(newItem);
    }

    resetForm();
    closeProductModal();
  };

  return (
    <form onSubmit={onSubmit} className="bg-white p-4 rounded">
      <div className="flex flex-col mb-4">
        <input
          ref={nameInputRef}
          className={`${inputStyles}`}
          type="text"
          name="name"
          placeholder="Nombre del artículo"
          onChange={onChange}
          value={formState.name}
          maxLength={25}
        />
        <label className="text-gray-700 font-semibold" htmlFor="name">
          <small>Nombre</small>
        </label>
      </div>
      <div className="flex flex-col mb-4">
        <input
          type="number"
          min="0"
          step="0.001"
          name="quantity"
          className={`${inputStyles}`}
          placeholder="Cantidad (Ejemplo: 99.999)"
          onChange={onChange}
          value={formState.quantity}
        />
        <label className="text-gray-700 font-semibold" htmlFor="quantity">
          <small>Cantidad</small>
        </label>
      </div>
      <div className="flex flex-col mb-4">
        <input
          type="number"
          min="0"
          max="999999.999"
          step="0.001"
          name="price"
          className={`${inputStyles}`}
          placeholder="Precio (Ejemplo: 999999.999)"
          onChange={onChange}
          value={formState.price}
        />
        <label className="text-gray-700 font-semibold" htmlFor="price">
          <small>Precio</small>
        </label>
      </div>

      {categories.length > 0 && (
        <div className="flex flex-col mb-4">
          <select
            ref={categoryInputRef}
            className={`${inputStyles}`}
            name="category"
            placeholder="Categoría"
            defaultValue={formState.categoryId || ''}
          >
            <option value="">Sin categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label className="text-gray-700 font-semibold" htmlFor="category">
            <small>Categoría</small>
          </label>
        </div>
      )}
      <div
        className={`grid grid-cols-${
          selectedProduct ? '2' : '1'
        } items-center justify-center gap-4`}
      >
        {selectedProduct && (
          <Button
            variation={ButtonVariation.DANGER}
            onClick={closeProductModal}
          >
            Cancelar
          </Button>
        )}
        <Button
          variation={ButtonVariation.PRIMARY}
          type="submit"
          disabled={formState.name.length <= 0}
        >
          {selectedProduct ? 'Editar' : 'Agregar'}
        </Button>
      </div>
    </form>
  );
};
