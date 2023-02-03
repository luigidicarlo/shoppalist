import { buttonDangerStyles, inputStyles } from '../constants/styles';

interface IProps {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterForm: React.FC<IProps> = ({ filter, setFilter }) => {
	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFilter(target.value);
	};

	const onClear = () => {
		setFilter('');
	};

	return (
		<div className="flex items-end justify-center w-full mb-4 gap-2">
			<input
				type="text"
				className={`${inputStyles} mb-0`}
				placeholder="Buscar"
				onChange={onChange}
				value={filter}
			/>
			<button
				type="button"
				className={`${buttonDangerStyles} px-2 py-1 disabled:bg-red-300`}
				disabled={!filter.length}
				title="Reiniciar Búsqueda"
				onClick={onClear}
			>
				<i className="fas fa-times"></i>
			</button>
		</div>
	);
};