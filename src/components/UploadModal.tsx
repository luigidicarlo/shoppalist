import { useState } from 'react';
import {
	buttonDangerStyles,
	buttonSuccessStyles,
	inputStyles,
} from '../constants/styles';
import { IItem } from '../interfaces';
import { Dialog } from '@headlessui/react';

interface IProps {
	setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
	isOpen: boolean;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadModal: React.FC<IProps> = ({
	setItems,
	isOpen,
	setIsOpen,
}) => {
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		e.target.files && setFile(e.target.files[0]);
	};

	const handleUploadFile = () => {
		const fileReader = new FileReader();
		fileReader.onload = e => {
			if (e.target) {
				setItems(JSON.parse(String(e.target.result)));
			}
		};
		fileReader.readAsText(file as File);
	};

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
					<form>
						<input
							className={`${inputStyles} border-b-0`}
							type="file"
							accept="application/json"
							onChange={handleFileChange}
						/>
						<div className="flex items-center justify-end">
							<button
								type="button"
								className={`${buttonSuccessStyles}`}
								form="import-list"
								onClick={handleUploadFile}
								data-bs-dismiss="modal"
							>
								Cargar
							</button>
						</div>
					</form>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};