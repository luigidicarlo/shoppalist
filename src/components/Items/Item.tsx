import { Fragment, useState } from 'react';
import {
	buttonDangerStyles,
	buttonPrimaryStyles,
} from '../../constants/styles';
import { useItemsContext } from '../../hooks/useItemsContext';
import { IItem } from '../../interfaces';

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
		<li className="shadow-customShadow px-4 py-2 mb-4">
			<div className="flex items-center justify-between">
				<h3
					className={`my-0 text-lg select-none w-full font-bold${
						(item.price && Number(item.price) <= 0) ||
						(item.quantity && Number(item.quantity) <= 0)
							? ' text-red-500'
							: ' text-gray-600'
					}`}
					onClick={onToggleInfo}
				>
					{item.name}
				</h3>
				<div className="flex items-center gap-4 pb-2">
					<button
						className="font-bold text-white bg-blue-500 h-8 w-8 rounded-lg flex items-center justify-center focus:outline-none"
						type="button"
						onClick={onEditItem}
					>
						<i className="fas fa-edit"></i>
					</button>
					<button
						type="button"
						className="font-bold text-white bg-red-500 h-8 w-8 rounded-lg flex items-center justify-center focus:outline-none"
						onClick={onDeleteItem}
					>
						<i className="fas fa-trash me-1"></i>
					</button>
				</div>
			</div>
			<Fragment>
				<hr />
				<div className="flex items-center justify-between pt-2 pb-2 text-gray-600">
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
			</Fragment>
		</li>
	);
};
