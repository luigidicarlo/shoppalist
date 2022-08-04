import { useState } from 'react';

export const UploadModal = ({ setItems }) => {
	const [file, setFile] = useState(null);

	const handleFileChange = e => {
		setFile(e.target.files[0]);
	};

	const handleUploadFile = () => {
		const fileReader = new FileReader();
		fileReader.onload = e => {
			setItems(JSON.parse(e.target.result));
		};
		fileReader.readAsText(file);
	};

	return (
		<div className="modal" tabIndex="-1" id="upload-modal">
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Importar lista</h5>
						<button
							type="button"
							className="btn-close"
							data-bs-dismiss="modal"
						></button>
					</div>
					<div className="modal-body">
						<form>
							<div className="form-group">
								<label htmlFor="upload-file">Archivo</label>
								<input
									className="form-control"
									type="file"
									accept="application/json"
									onChange={handleFileChange}
								/>
							</div>
							<div className="form-group mt-3 d-flex align-items-center justify-content-end">
								<button
									type="button"
									className="btn btn-secondary me-2"
									data-bs-dismiss="modal"
								>
									Cerrar
								</button>
								<button
									type="button"
									className="btn btn-primary"
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
