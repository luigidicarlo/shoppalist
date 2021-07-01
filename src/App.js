import { useEffect, useState } from 'react';
import swal from 'sweetalert';
import { v4 } from 'uuid';

import Items from './Items';
import Header from './Header';

const defaultState = {
	name: '',
	quantity: '',
	price: '',
	itemToEdit: null,
};

export default function App() {
	const rawItems = localStorage.getItem('items');
	const defaultItems = rawItems ? JSON.parse(rawItems) : [];
	const [items, setItems] = useState(defaultItems);
	const [formState, setFormState] = useState(defaultState);
	const [showForm, setShowForm] = useState(false);

	useEffect(() => {
		localStorage.setItem('items', JSON.stringify(items));
	}, [items]);

	function onSubmit(e) {
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
	}

	function onChange({ target }) {
		setFormState(state => ({ ...state, [target.name]: target.value }));
	}

	function onToggleForm() {
		setShowForm(show => !show);
	}

	function resetForm() {
		setFormState(defaultState);
	}

	function updateItem(itemId, itemData) {
		setItems(items.map(item => (item.id === itemId ? itemData : item)));
	}

	function deleteItem(itemId) {
		swal({
			title: 'Eliminar',
			text: '¿Deseas eliminar el elemento seleccionado?',
			buttons: ['Cancelar', 'Eliminar'],
			dangerMode: true,
		}).then(confirmed => {
			if (!confirmed) return;

			setItems(items => items.filter(item => item.id !== itemId));
		});
	}

	return (
		<>
			<Header />
			<div className="container">
				<div className="card mb-4">
					<div className="card-header">
						<div className="d-flex align-items-center justify-content-center">
							<button
								className="btn btn-sm btn-secondary text-white"
								type="button"
								onClick={onToggleForm}
							>
								{showForm ? 'Ocultar Formulario' : 'Mostrar Formulario'}
							</button>
						</div>
					</div>
					{showForm && (
						<div className="card-body">
							<form
								onSubmit={onSubmit}
								className="form-inline d-flex flex-sm-row flex-column align-items-center justify-content-between"
							>
								<div className="form-group mb-2 me-1">
									<input
										className="form-control"
										type="text"
										name="name"
										value={formState.name}
										onChange={onChange}
										placeholder="Nombre"
									/>
								</div>
								<div className="form-group mb-2 me-1">
									<input
										type="number"
										min="0"
										step="0.01"
										name="quantity"
										className="form-control"
										value={formState.quantity}
										onChange={onChange}
										placeholder="Cantidad (ejemplo: 5 ó 2.5)"
									/>
								</div>
								<div className="form-group mb-2 me-1">
									<input
										type="number"
										min="0"
										step="0.01"
										name="price"
										className="form-control"
										value={formState.price}
										onChange={onChange}
										placeholder="Precio (ejemplo: 9.99)"
									/>
								</div>
								<button className="d-block btn btn-success mb-2" type="submit">
									{formState.itemToEdit ? 'Editar' : 'Agregar'}
								</button>
							</form>
						</div>
					)}
				</div>
				<div className="row">
					<div className="col-xs-12">
						<Items
							items={items}
							deleteItem={deleteItem}
							setFormState={setFormState}
							setShowForm={setShowForm}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
