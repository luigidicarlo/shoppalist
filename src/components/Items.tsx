import { IFormState, IItem } from '../interfaces';
import { Item } from './Item';

interface IProps {
	items: IItem[];
	deleteItem: (itemId: string) => void;
	setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
	setIsItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Items: React.FC<IProps> = ({
	items,
	deleteItem,
	setFormState,
	setIsItemModalOpen,
}) => {
	const onEdit = (item: IItem) => {
		setIsItemModalOpen(true);
		setFormState({
			name: item.name,
			quantity: Number(item.quantity) === 0 ? '' : item.quantity,
			price: Number(item.price) === 0 ? '' : item.price,
			itemToEdit: item,
		});
	};

	return (
		<ul className="mt-8 mb-4 rounded">
			{!items.length && (
				<li className="flex items-center justify-center">
					<h2 className="text-2xl font-bold text-center">
						No hay elementos para mostrar
					</h2>
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
