import { useState } from 'react';
import {
	buttonDangerStyles,
	buttonSuccessStyles,
	inputStyles,
} from '../constants/styles';
import { IItem } from '../interfaces';

interface IProps {
	setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
}

export const UploadModal: React.FC<IProps> = ({ setItems }) => {
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

	return (
		<div className="modal" tabIndex={-1} id="upload-modal">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title text-xl font-bold">Importar lista</h5>
						<button type="button" className="p-1" data-bs-dismiss="modal">
							<i className="fas fa-times"></i>
						</button>
					</div>
					<div className="modal-body">
						<form>
							<input
								className={`${inputStyles} border-b-0`}
								type="file"
								accept="application/json"
								onChange={handleFileChange}
							/>
							<div className="flex items-center justify-end gap-2">
								<button
									type="button"
									className={`${buttonDangerStyles}`}
									data-bs-dismiss="modal"
								>
									Cerrar
								</button>
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
					</div>
				</div>
			</div>
		</div>
	);
};
