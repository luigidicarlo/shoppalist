import React from 'react';

export default function Items({
	items,
	deleteItem,
	setFormState,
	setShowForm,
}) {
	function getSubtotal(item) {
		return Number(item.quantity) * Number(item.price);
	}

	function getTotal() {
		return items.reduce((prev, curr) => Number((prev += getSubtotal(curr))), 0);
	}

	function onEdit(item) {
		setShowForm(true);
		setFormState({
			name: item.name,
			quantity: item.quantity,
			price: item.price,
			itemToEdit: item,
		});
	}

	return (
		<>
			<div className="d-flex flex-md-row flex-column justify-content-md-between px-md-5">
				<p className="text-center">
					<i className="fas fa-info me-2 text-info" /> Haz clic/tap sobre una
					fila para editarla
				</p>
				<p className="text-center">
					<i className="fas fa-info me-2 text-info" /> Haz doble clic/tap sobre
					una fila para eliminarla
				</p>
			</div>
			<div className="table-responsive">
				<table className="table table-bordered">
					<thead className="bg-primary text-white">
						<tr>
							<th>Nombre</th>
							<th>Cantidad</th>
							<th>Precio</th>
							<th>Subtotal</th>
						</tr>
					</thead>
					<tbody>
						{!items.length && (
							<tr>
								<td colSpan={4}>
									<h4 className="text-center">No hay elementos en la lista</h4>
								</td>
							</tr>
						)}
						{items.length > 0 &&
							items.map(item => (
								<tr
									key={item.id}
									onClick={() => onEdit(item)}
									onDoubleClick={() => deleteItem(item.id)}
								>
									<td>{item.name}</td>
									<td>{Number(item.quantity).toFixed(2)}</td>
									<td>{Number(item.price).toFixed(2)}</td>
									<td>{getSubtotal(item).toFixed(2)}</td>
								</tr>
							))}
					</tbody>
					{items.length > 0 && (
						<tfoot>
							<tr>
								<td colSpan={4}>
									<h5 className="text-center">
										Total: {Number(getTotal()).toFixed(2)}
									</h5>
								</td>
							</tr>
						</tfoot>
					)}
				</table>
			</div>
		</>
	);
}
