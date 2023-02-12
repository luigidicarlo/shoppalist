import { Fragment, useState } from 'react';
import { buttonDangerStyles, buttonPrimaryStyles } from '../constants/styles';
import { useItemsContext } from '../hooks/useItemsContext';
import { IItem } from '../interfaces';

interface IProps {
	item: IItem;
	onEdit: (item: IItem) => void;
}

export const Item: React.FC<IProps> = ({ item, onEdit }) => {
	const [isOpen, setIsOpen] = useState(false);
	const { deleteItem } = useItemsContext();

	const onToggleInfo = () => {
		setIsOpen(open => !open);
	};

	const onEditItem = () => {
		onEdit(item);
	};

	const onDeleteItem = () => {
		deleteItem(item.id);
	};

	return (
		<li className="shadow px-4 py-2 mb-4">
			<div className="flex items-center justify-between">
				<h3
					className={`my-0 text-lg select-none cursor-pointer w-full font-bold${
						(item.price && Number(item.price) <= 0) ||
						(item.quantity && Number(item.quantity) <= 0)
							? ' text-red-500'
							: ' text-gray-700'
					}`}
					onClick={onToggleInfo}
				>
					{item.name}
				</h3>
				<div className="flex items-center gap-4">
					<button
						className="font-bold text-gray-700 focus:outline-none"
						type="button"
						onClick={onEditItem}
					>
						<i className="fas fa-edit"></i>
					</button>
					<button
						className="font-bold text-gray-700 focus:outline-none"
						title={`${isOpen ? 'Ocultar' : 'Mostrar'} detalles de ${item.name}`}
						onClick={onToggleInfo}
					>
						<i
							className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
						></i>
					</button>
				</div>
			</div>
			{isOpen && (
				<Fragment>
					<hr />
					<div className="flex items-center justify-between pt-4 pb-2">
						<div className="flex flex-col">
							<p className="font-bold">{Number(item.price).toFixed(3)}</p>
							<p>
								<small>Precio</small>
							</p>
						</div>
						<div className="flex flex-col items-center">
							<p className="font-bold">{Number(item.quantity).toFixed(3)}</p>
							<p>
								<small>Cantidad</small>
							</p>
						</div>
						<div className="flex flex-col items-end">
							<p className="font-bold">
								{(Number(item.price) * Number(item.quantity)).toFixed(3)}
							</p>
							<p>
								<small>Subtotal</small>
							</p>
						</div>
					</div>
					<hr />
					<div className="flex items-center justify-center my-3 gap-4">
						<button
							type="button"
							className={`${buttonPrimaryStyles} w-1/2 flex items-center justify-center gap-2`}
							onClick={onEditItem}
						>
							<i className="fas fa-edit me-1"></i>
							<span>Editar</span>
						</button>
						<button
							type="button"
							className={`${buttonDangerStyles} w-1/2 flex items-center justify-center gap-2`}
							onClick={onDeleteItem}
						>
							<i className="fas fa-trash me-1"></i>
							<span>Eliminar</span>
						</button>
					</div>
				</Fragment>
			)}
		</li>
	);
};
