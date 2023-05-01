import { useState } from 'react';
import { buttonSuccessStyles, inputStyles } from '../../constants/styles';
import { Dialog } from '@headlessui/react';
import { useItemsContext } from '../../hooks/useItemsContext';
import { useModals } from '../../hooks/useModals';

export const UploadModal: React.FC = () => {
	const { setItems } = useItemsContext();
	const { isUploadModalOpen: isOpen, closeUploadModal } = useModals();
	const [file, setFile] = useState<File | null>(null);

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
		e.target.files && setFile(e.target.files[0]);
	};

	const handleUploadFile = () => {
		const fileReader = new FileReader();
		fileReader.onload = e => {
			if (e.target) {
				setItems(JSON.parse(String(e.target.result)));
				closeUploadModal();
			}
		};
		fileReader.readAsText(file as File);
	};

	return (
		<Dialog open={isOpen} onClose={closeUploadModal} className="relative z-50">
			<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
			<div className="fixed inset-0 flex items-center justify-center p-4">
				<Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white p-4 shadow-lg">
					<div className="flex items-center justify-end">
						<button type="button" onClick={closeUploadModal} className="p-2">
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
