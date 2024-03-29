import { useItemsContext } from '../../hooks/useItemsContext';
import { useModals } from '../../hooks/useModals';
import { IFormState, IItem } from '../../interfaces';
import { Item } from './Item';

interface IProps {
	setFormState: React.Dispatch<React.SetStateAction<IFormState>>;
}

export const Items: React.FC<IProps> = ({ setFormState }) => {
	const { filteredItems } = useItemsContext();
	const { openItemModal } = useModals();

	const onEdit = (item: IItem) => {
		openItemModal();
		setFormState({
			name: item.name,
			quantity: Number(item.quantity) === 0 ? '' : item.quantity,
			price: Number(item.price) === 0 ? '' : item.price,
			itemToEdit: item
		});
	};

	return (
		<ul className={`rounded flex-1 overflow-y-auto w-full px-4${filteredItems.length > 0 && ' pb-12'}`}>
			{!filteredItems.length && (
				<li className="flex items-center justify-center first:pt-12">
					<h2 className="text-2xl font-bold text-center">
						No hay elementos para mostrar
					</h2>
				</li>
			)}
			{filteredItems.length > 0 &&
				filteredItems.map(item => (
					<Item item={item} key={item.id} onEdit={onEdit} />
				))}
		</ul>
	);
};
