import { useContext, useEffect } from 'react';
import swal from 'sweetalert';
import { ItemsContext } from '../components/Contexts/ItemsContext';
import { IItem } from '../interfaces';

export function useItemsContext() {
	const {
		items,
		setItems,
		filteredItems,
		setFilteredItems,
		filter,
		setFilter,
	} = useContext(ItemsContext);

	useEffect(() => {
		if (filter.length > 0) {
			const filteredElements = items.filter((item: IItem) =>
				item.name.toLowerCase().includes(filter.toLowerCase().trim())
			);
			setFilteredItems(filteredElements);
		} else {
			setFilteredItems(items);
		}
	}, [filter, items]);

	const addItem = (item: IItem) => {
		setItems([item, ...items]);
	};

	const updateItem = (itemId: string, itemData: IItem) => {
		setItems(
			items.map((item: IItem) => (item.id === itemId ? itemData : item))
		);
	};

	const deleteItem = (itemId: string) => {
		const itemToDelete = items.find(item => item.id === itemId);
		if (itemToDelete) {
			swal({
				title: 'Eliminar',
				text: `¿Deseas eliminar ${itemToDelete.name}?`,
				buttons: ['Cancelar', 'Eliminar'],
				dangerMode: true,
			}).then(confirmed => {
				if (!confirmed) {
					return;
				}
				setItems(items => items.filter(item => item.id !== itemId));
			});
		}
	};

	return {
		items,
		setItems,
		filteredItems,
		setFilteredItems,
		addItem,
		updateItem,
		deleteItem,
		filter,
		setFilter,
	};
}
