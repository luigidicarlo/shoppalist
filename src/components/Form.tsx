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
}

export const Form: React.FC<IProps> = ({
	onSubmit,
	formState,
	onChange,
	resetForm,
}) => {
	return (
		<form onSubmit={onSubmit} className="bg-white shadow p-4 rounded mb-8">
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
			<div className="flex items-center justify-center">
				{formState.itemToEdit && (
					<button
						type="button"
						className={`${buttonDangerStyles}`}
						onClick={resetForm}
					>
						Cancelar
					</button>
				)}
				<button
					className={`${buttonSuccessStyles}`}
					type="submit"
					disabled={formState.name.length <= 0}
				>
					{formState.itemToEdit ? 'Editar' : 'Agregar'}
				</button>
			</div>
		</form>
	);
};
