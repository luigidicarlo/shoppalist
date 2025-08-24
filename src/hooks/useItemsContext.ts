import { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import { ProductsContext } from '../components/Contexts/ItemsContext';
import { Product } from '../types/models/product';
import { Category } from '../types/models/category';

export function useProductsContext() {
  const {
    selectedProduct,
    setSelectedProduct,
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    filter,
    setFilter,
    categories,
    setCategories,
  } = useContext(ProductsContext);

  useEffect(() => {
    if (filter.length > 0) {
      const filteredElements = products.filter((item: Product) =>
        item.name.toLowerCase().includes(filter.toLowerCase().trim()),
      );
      setFilteredProducts(filteredElements);
    } else {
      setFilteredProducts(
        products.sort((a, b) => {
          const productCategory =
            categories.find((cat) => cat.id === a.categoryId)?.name || '';
          const nextProductCategory =
            categories.find((cat) => cat.id === b.categoryId)?.name || '';
          return productCategory.localeCompare(nextProductCategory);
        }),
      );
    }
  }, [filter, products]);

  const addItem = (item: Product) => {
    setProducts([item, ...products]);
  };

  const updateItem = (itemId: string, itemData: Product) => {
    setProducts(
      products.map((item: Product) => (item.id === itemId ? itemData : item)),
    );
    setSelectedProduct(null);
  };

  const deleteItem = (itemId: string) => {
    const itemToDelete = products.find((item) => item.id === itemId);
    if (itemToDelete) {
      swal({
        title: 'Eliminar',
        text: `¿Deseas eliminar ${itemToDelete.name}?`,
        buttons: ['Cancelar', 'Eliminar'],
        dangerMode: true,
      }).then((confirmed) => {
        if (!confirmed) {
          return;
        }
        setProducts((items) => items.filter((item) => item.id !== itemId));
      });
    }
  };

  const getCategoryById = (id: string): string => {
    const category = categories.find((cat) => cat.id === id);
    return category ? category.name : 'Sin categoría';
  };

  const addCategory = (category: Category) => {
    setCategories([...categories, category]);
  };

  const deleteCategory = (id: string) => {
    const categoryToDelete = categories.find((category) => category.id === id);
    if (categoryToDelete) {
      swal({
        title: 'Eliminar',
        text: `¿Deseas eliminar ${categoryToDelete.name}?`,
        buttons: ['Cancelar', 'Eliminar'],
        dangerMode: true,
      }).then((confirmed) => {
        if (!confirmed) {
          return;
        }
        setCategories((categories) =>
          categories.filter((category) => category.id !== id),
        );
      });
    }
  };

  return {
    selectedProduct,
    setSelectedProduct,
    products,
    setProducts,
    filteredProducts,
    setFilteredProducts,
    addItem,
    updateItem,
    deleteItem,
    filter,
    setFilter,
    categories,
    setCategories,
    getCategoryById,
    addCategory,
    deleteCategory,
  };
}
