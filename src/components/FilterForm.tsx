import { buttonDangerStyles, inputStyles } from '../constants/styles';
import { useItemsContext } from '../hooks/useItemsContext';
import { getTotal } from '../utils/calculations';

export const FilterForm: React.FC = () => {
	const { filter, setFilter, items } = useItemsContext();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFilter(target.value);
	};

	const onClear = () => {
		setFilter('');
	};

	return (
		<div className="sticky top-0 left-0 p-2 bg-white">
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
			{items.length > 0 && (
				<h2 className="text-lg text-center text-gray-700 select-none">
					<span className="font-bold">Total:</span>{' '}
					{Number(getTotal(items)).toFixed(3)}
				</h2>
			)}
		</div>
	);
};
