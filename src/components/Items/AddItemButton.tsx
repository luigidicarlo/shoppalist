import { buttonPrimaryStyles } from '../../constants/styles';
import { useModals } from '../../hooks/useModals';

export const AddItemButton: React.FC = () => {
	const { openItemModal } = useModals();

	return (
		<div className="fixed bottom-2 left-0 w-full flex items-center justify-center">
			<button
				type="button"
				className={`${buttonPrimaryStyles
					.replace('rounded', 'rounded-full')
					.replace(
						'bg-blue-500',
						'bg-blue-700'
					)} p-2 shadow-customShadow shadow-blue-200 flex items-center justify-center gap-2 h-12 w-12`}
				onClick={openItemModal}
				title="Agregar Producto"
			>
				<i className="fas text-2xl fa-plus"></i>
			</button>
		</div>
	);
};
