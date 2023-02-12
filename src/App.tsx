import { useEffect } from 'react';
import { v4 } from 'uuid';

import { Items } from './components/Items';
import { Header } from './components/Header';
import { FilterForm } from './components/FilterForm';
import { UploadModal } from './components/UploadModal';
import { IFormState, IItem } from './interfaces';
import { ItemModal } from './components/ItemModal';
import { useItemsContext } from './hooks/useItemsContext';
import { useForm } from './hooks/useForm';
import { useModals } from './hooks/useModals';

const defaultState = {
	name: '',
	quantity: '',
	price: '',
	itemToEdit: undefined,
};

export const App = () => {
	const { items, updateItem, addItem } = useItemsContext();
	const { formState, setFormState, resetForm } = useForm(defaultState);
	const { closeItemModal } = useModals(resetForm);

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

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
			addItem(newItem);
		}

		closeItemModal();
	};

	const onChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		setFormState({
			...formState,
			[e.target.name]: e.target.value,
		});
	};

	return (
		<>
			<FilterForm />
			<Items setFormState={setFormState} />
			<Header />
			<UploadModal />
			<ItemModal
				formState={formState}
				onChange={onChange}
				onSubmit={onSubmit}
				resetForm={resetForm}
			/>
		</>
	);
};
