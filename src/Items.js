import React from 'react';
import { Item } from './Item';

export const Items = ({ items, deleteItem, setFormState }) => {
	const getSubtotal = item => {
		return Number(item.quantity) * Number(item.price);
	};

	const getTotal = () => {
		return items.reduce((prev, curr) => Number((prev += getSubtotal(curr))), 0);
	};

	const onEdit = item => {
		setFormState({
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			itemToEdit: item,
		});
	};

	return (
		<ul className="list-group shadow-sm mb-4">
			{!items.length && (
				<li className="list-group-item">
					<h2 className="text-center text-secondary">
						No hay elementos para mostrar
					</h2>
				</li>
			)}
			{items.length > 0 && (
				<li className="list-group-item">
					<h2 className="text-center my-0">{Number(getTotal()).toFixed(3)}</h2>
					<p className="text-secondary text-center small">Total</p>
				</li>
			)}
			{items.length > 0 &&
				items.map(item => (
					<Item
						item={item}
						key={item.id}
						onEdit={onEdit}
						onDelete={deleteItem}
					/>
				))}
		</ul>
	);
};
