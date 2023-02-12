import {
	buttonDangerStyles,
	buttonSuccessStyles,
	inputStyles,
} from '../constants/styles';
import { IFormState } from '../interfaces';

interface IProps {
	onSubmit: React.FormEventHandler;
	formState: IFormState;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	resetForm: () => void;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Form: React.FC<IProps> = ({
	onSubmit,
	formState,
	onChange,
	resetForm,
	setIsOpen,
}) => {
	const closeModal = () => {
		resetForm()
		setIsOpen(false);
	}

	return (
		<form onSubmit={onSubmit} className="bg-white p-4 rounded">
			<input
				className={`${inputStyles}`}
				type="text"
				name="name"
				value={formState.name}
				onChange={onChange}
				placeholder="Nombre del artículo"
			/>
			<input
				type="number"
				min="0"
				step="0.001"
				name="quantity"
				className={`${inputStyles}`}
				value={formState.quantity}
				onChange={onChange}
				placeholder="Cantidad (Ejemplo: 99.999)"
			/>
			<input
				type="number"
				min="0"
				max="999999.999"
				step="0.001"
				name="price"
				className={`${inputStyles}`}
				value={formState.price}
				onChange={onChange}
				placeholder="Precio (Ejemplo: 999999.999)"
			/>
			<div
				className={`flex items-center justify-center mt-8${
					formState.itemToEdit && ' gap-4'
				}`}
			>
				{formState.itemToEdit && (
					<button
						type="button"
						className={`${buttonDangerStyles} w-1/2`}
						onClick={closeModal}
					>
						Cancelar
					</button>
				)}
				<button
					className={`${buttonSuccessStyles}${
						formState.itemToEdit && ' w-1/2'
					} cursor-pointer disabled:bg-green-200`}
					type="submit"
					disabled={formState.name.length <= 0}
				>
					{formState.itemToEdit ? 'Editar' : 'Agregar'}
				</button>
			</div>
		</form>
	);
};
