import { buttonPrimaryStyles } from '../../constants/styles';
import { useModals } from '../../hooks/useModals';

export const AddItemButton: React.FC = () => {
	const { openItemModal } = useModals();

	return (
		<div className="fixed bottom-2 right-2 flex items-center justify-end">
			<button
				type="button"
				className={`${buttonPrimaryStyles
					.replace('rounded', 'rounded-full')
					.replace(
						'bg-blue-500',
						'bg-blue-800'
					)} p-2 shadow-customShadow flex items-center justify-center gap-2 h-10 w-10`}
				onClick={openItemModal}
				title="Agregar Producto"
			>
				<i className="fas fa-plus"></i>
			</button>
		</div>
	);
};
