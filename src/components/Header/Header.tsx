import swal from 'sweetalert';
import { buttonPrimaryStyles } from '../../constants/styles';
import { useItemsContext } from '../../hooks/useItemsContext';
import { useModals } from '../../hooks/useModals';
import { HeaderPopover } from './HeaderPopover';

export const Header: React.FC = () => {
	const { items, setItems } = useItemsContext();
	const { openItemModal, openUploadModal } = useModals();

	return (
		<header className="fixed bottom-0 bg-blue-500 py-2 w-full">
			<div className="flex flex-wrap items-center justify-between text-white max-w-sm mx-auto">
				<HeaderPopover />
				<div className="flex items-center justify-end pr-2">
					<button
						type="button"
						className={`${buttonPrimaryStyles
							.replace('rounded', 'w-10 h-10 rounded-full')
							.replace(
								'bg-blue-500',
								'bg-blue-800'
							)} py-2 px-2 shadow flex items-center justify-center`}
						onClick={openItemModal}
						title="Agregar Producto"
					>
						<i className="fas fa-plus"></i>
					</button>
				</div>
			</div>
		</header>
	);
};
