import { IFormState } from '../../interfaces';
import { Dialog } from '@headlessui/react';
import { Form } from '../Forms/Form';
import { useModals } from '../../hooks/useModals';

interface IProps {
	formState: IFormState;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onSubmit: React.FormEventHandler;
	resetForm: () => void;
}

export const ItemModal: React.FC<IProps> = ({
	formState,
	onSubmit,
	onChange,
	resetForm,
}) => {
	const { isItemModalOpen: isOpen, closeItemModal } = useModals(resetForm);

	return (
		<Dialog open={isOpen} onClose={closeItemModal} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg">
					<div className="flex items-center justify-end">
						<button type="button" onClick={closeItemModal} className="p-2">
							<i className="fas fa-times"></i>
						</button>
					</div>
					<Dialog.Title as="h2" className="text-center font-bold text-xl mb-4">
						{formState.itemToEdit?.name
							? 'Editar Producto'
							: 'Agregar Producto'}
					</Dialog.Title>
					<Form
						formState={formState}
						onSubmit={onSubmit}
						resetForm={resetForm}
						onChange={onChange}
						closeModal={closeItemModal}
					/>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};
