import { useRef } from 'react';
import {
	buttonDangerStyles,
	buttonSuccessStyles,
	inputStyles,
} from '../constants/styles';
import { useForm } from '../hooks/useForm';
import { IFormState } from '../interfaces';

interface IProps {
	onSubmit: React.FormEventHandler;
	formState: IFormState;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	resetForm: () => void;
	closeModal: () => void;
}

export const Form: React.FC<IProps> = ({
	onSubmit,
	formState,
	closeModal,
	onChange,
}) => {
	return (
		<form onSubmit={onSubmit} className="bg-white p-4 rounded">
			<input
				className={`${inputStyles}`}
				type="text"
				name="name"
				placeholder="Nombre del artículo"
				onChange={onChange}
				value={formState.name}
			/>
			<input
				type="number"
				min="0"
				step="0.001"
				name="quantity"
				className={`${inputStyles}`}
				placeholder="Cantidad (Ejemplo: 99.999)"
				onChange={onChange}
				value={formState.quantity}
			/>
			<input
				type="number"
				min="0"
				max="999999.999"
				step="0.001"
				name="price"
				className={`${inputStyles}`}
				placeholder="Precio (Ejemplo: 999999.999)"
				onChange={onChange}
				value={formState.price}
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
