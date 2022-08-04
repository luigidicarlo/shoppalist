import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { v4 } from 'uuid';

import { Items } from './Items';
import { Header } from './Header';
import { Form } from './Form';
import { FilterForm } from './FilterForm';
import { UploadModal } from './UploadModal';

const defaultState = {
	name: '',
	quantity: '',
	price: '',
	itemToEdit: null,
};

export const App = () => {
	const rawItems = localStorage.getItem('items');
	const defaultItems = rawItems ? JSON.parse(rawItems) : [];
	const [items, setItems] = useState(defaultItems);
	const [filteredItems, setFilteredItems] = useState(items);
	const [filter, setFilter] = useState('');
	const [formState, setFormState] = useState(defaultState);

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	useEffect(() => {
		if (filter.length > 0) {
			const filteredElements = items.filter(item =>
				item.name.toLowerCase().includes(filter.toLowerCase())
			);
			setFilteredItems(filteredElements);
		} else {
			setFilteredItems(items);
		}
	}, [filter, items]);

	const onSubmit = e => {
		e.preventDefault();

		const { name, quantity, price, itemToEdit } = formState;

		if (formState.itemToEdit) {
			updateItem(itemToEdit.id, {
				id: itemToEdit.id,
				name: name.trim(),
				quantity: Number(quantity),
				price: Number(price),
			});
		} else {
			const newItem = {
				id: v4(),
				name: name.trim(),
				quantity: Number(quantity),
				price: Number(price),
			};

			setItems([newItem, ...items]);
		}

		resetForm();
	};

	const onChange = ({ target }) => {
		setFormState(state => ({ ...state, [target.name]: target.value }));
	};

	const resetForm = () => {
		setFormState(defaultState);
	};

	const updateItem = (itemId, itemData) => {
		setItems(items.map(item => (item.id === itemId ? itemData : item)));
	};

	const deleteItem = itemId => {
		swal({
			title: 'Eliminar',
			text: '¿Deseas eliminar el elemento seleccionado?',
			buttons: ['Cancelar', 'Eliminar'],
			dangerMode: true,
		}).then(confirmed => {
			if (!confirmed) return;

			setItems(items => items.filter(item => item.id !== itemId));
		});
	};

	return (
		<>
			<Header items={items} setItems={setItems} />
			<div className="container">
				<div className="card mb-4">
					<div className="card-body">
						<Form
							onSubmit={onSubmit}
							formState={formState}
							onChange={onChange}
							resetForm={resetForm}
						/>
					</div>
				</div>
				<FilterForm filter={filter} setFilter={setFilter} />
				<Items
					items={filteredItems}
					deleteItem={deleteItem}
					setFormState={setFormState}
				/>
			</div>
			<UploadModal setItems={setItems} />
		</>
	);
};
