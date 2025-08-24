import { FC, FormEventHandler, useRef, useState } from 'react';
import { useModals } from '../../hooks/useModals';
import { Dialog } from '@headlessui/react';
import { inputStyles } from '../../constants/styles';
import { Button, ButtonVariation } from '../Buttons/Button';
import { useProductsContext } from '../../hooks/useItemsContext';
import { Category } from '../../types/models/category';
import { v4 } from 'uuid';

export const CategoriesModal: FC = () => {
  const [categoryName, setCategoryName] = useState('');
  const { categories, addCategory, deleteCategory } = useProductsContext();
  const { isCategoriesModalOpen: isOpen, closeCategoriesModal } = useModals();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const newCategoryName = formData.get('category')?.toString().trim();

    if (newCategoryName) {
      const newCategory: Category = {
        id: v4(),
        name: newCategoryName,
      };
      addCategory(newCategory);
      setCategoryName('');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={closeCategoriesModal}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg">
          <div className="flex items-center justify-end">
            <button
              type="button"
              onClick={closeCategoriesModal}
              className="p-2"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
          <Dialog.Title as="h2" className="text-center font-bold text-xl mb-4">
            Categorías de Productos
          </Dialog.Title>
          <div className="flex flex-col gap-4">
            <h4 className="mb-2 font-semibold text-gray-700">
              Agregar Categoría
            </h4>
            <form className="flex items-start gap-1" onSubmit={onSubmit}>
              <input
                className={`${inputStyles} col-span-3`}
                type="text"
                name="category"
                placeholder="Categoría..."
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
              />
              <div className="flex items-center justify-end">
                <Button
                  variation={ButtonVariation.PRIMARY}
                  type="submit"
                  disabled={categoryName.trim().length <= 0}
                >
                  <i className="fas fa-plus" />
                </Button>
              </div>
            </form>
            <hr />
            <div className="max-h-52 overflow-y-auto">
              {categories.length > 0 ? (
                <ul>
                  {categories.map((category) => (
                    <li key={category.id} className="mb-2 last:mb-0">
                      <div className="flex items-center gap-2">
                        <span className="flex-1">{category.name}</span>
                        <Button
                          variation={ButtonVariation.DANGER}
                          onClick={() => deleteCategory(category.id)}
                        >
                          <i className="fas fa-trash" />
                        </Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <h4 className="font-semibold text-gray-700 text-center">
                  No hay categorías registradas
                </h4>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
