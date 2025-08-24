import { buttonPrimaryStyles } from '../../constants/styles';
import { useModals } from '../../hooks/useModals';
import { Button, ButtonVariation } from './Button';

export const AddItemButton: React.FC = () => {
	const { openProductModal: openItemModal } = useModals();

	return (
		<div className="fixed bottom-2 right-2">
			<Button
				variation={ButtonVariation.ADD}
				onClick={openItemModal}
				title="Agregar Producto"
			>
				<i className="fas text-2xl fa-plus" />
			</Button>
		</div>
	);
};
