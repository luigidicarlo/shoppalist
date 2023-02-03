import { IFormState, IItem } from '../interfaces';
import { Dialog } from '@headlessui/react';
import { Form } from './Form';

interface IProps {
	formState: IFormState;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	onSubmit: React.FormEventHandler;
	resetForm: () => void;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ItemModal: React.FC<IProps> = ({
	formState,
	onChange,
	onSubmit,
	resetForm,
	isOpen,
	setIsOpen,
}) => {
	const closeModal = () => setIsOpen(false);

	return (
		<Dialog open={isOpen} onClose={closeModal} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-4">
					<div className="flex items-center justify-end">
						<button type="button" onClick={closeModal} className="p-2">
							<i className="fas fa-times"></i>
						</button>
					</div>
					<Dialog.Title as="h2" className="text-center font-bold text-xl mb-4">
						Agregar Producto
					</Dialog.Title>
					<Form
						formState={formState}
						onChange={onChange}
						onSubmit={onSubmit}
						resetForm={resetForm}
						setIsOpen={setIsOpen}
					/>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};
