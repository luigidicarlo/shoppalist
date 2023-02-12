import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { v4 } from 'uuid';

import { Items } from './components/Items';
import { Header } from './components/Header';
import { Form } from './components/Form';
import { FilterForm } from './components/FilterForm';
import { UploadModal } from './components/UploadModal';
import { IFormState, IItem } from './interfaces';
import { buttonSuccessStyles } from './constants/styles';
import { ItemModal } from './components/ItemModal';

const defaultState = {
	name: '',
	quantity: '',
	price: '',
	itemToEdit: undefined,
};

export const App = () => {
	const rawItems = localStorage.getItem('items');
	const defaultItems = rawItems ? JSON.parse(rawItems) : [];
	const [items, setItems] = useState<IItem[]>(defaultItems);
	const [filteredItems, setFilteredItems] = useState(items);
	const [filter, setFilter] = useState('');
	const [formState, setFormState] = useState<IFormState>(defaultState);
	const [isItemModalOpen, setIsItemModalOpen] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	useEffect(() => {
		if (filter.length > 0) {
			const filteredElements = items.filter((item: IItem) =>
				item.name.toLowerCase().includes(filter.toLowerCase())
			);
			setFilteredItems(filteredElements);
		} else {
			setFilteredItems(items);
		}
	}, [filter, items]);

	const onSubmit: React.FormEventHandler = e => {
		e.preventDefault();

		const { name, quantity, price, itemToEdit } = formState;

		if (itemToEdit) {
			updateItem(itemToEdit.id, {
				id: itemToEdit.id,
				name: name.trim(),
				quantity: String(Number(quantity)),
				price: String(Number(price)),
			});
		} else {
			const newItem = {
				id: v4(),
				name: name.trim(),
				quantity: String(Number(quantity)),
				price: String(Number(price)),
			};

			setItems([newItem, ...items]);
		}

		resetForm();
		setIsItemModalOpen(false);
	};

	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFormState(state => ({ ...state, [target.name]: target.value }));
	};

	const resetForm = () => {
		setFormState(defaultState);
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
				if (!confirmed) return;

				setItems(items => items.filter(item => item.id !== itemId));
			});
		}
	};

	const openItemModal = () => setIsItemModalOpen(true);

	return (
		<>
			<FilterForm items={filteredItems} filter={filter} setFilter={setFilter} />
			<main className="container mx-auto max-w-sm px-2">
				<Items
					setIsItemModalOpen={setIsItemModalOpen}
					items={filteredItems}
					deleteItem={deleteItem}
					setFormState={setFormState}
				/>
			</main>
			<Header
				items={items}
				setItems={setItems}
				setModalOpen={setIsUploadModalOpen}
				openItemModal={openItemModal}
			/>
			<UploadModal
				setItems={setItems}
				isOpen={isUploadModalOpen}
				setIsOpen={setIsUploadModalOpen}
			/>
			<ItemModal
				isOpen={isItemModalOpen}
				setIsOpen={setIsItemModalOpen}
				formState={formState}
				onChange={onChange}
				onSubmit={onSubmit}
				resetForm={resetForm}
			/>
		</>
	);
};
