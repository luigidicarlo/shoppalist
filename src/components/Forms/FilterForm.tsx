import { inputStyles } from '../../constants/styles';
import { useItemsContext } from '../../hooks/useItemsContext';

export const FilterForm: React.FC = () => {
	const { filter, setFilter } = useItemsContext();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFilter(target.value);
	};

	const resetFilter = () => {
		setFilter('');
	};

	return (
		<div className="flex items-center justify-center">
			<div className="bottom-12 p-4 bg-white w-full max-w-sm">
				<div className="flex items-center w-full gap-2">
					<input
						type="text"
						className={`${inputStyles} mb-0 text-lg text-black rounded-none`}
						placeholder="Buscar"
						onChange={onChange}
						value={filter}
					/>
					{filter.length > 0 && (
						<button type="button" onClick={resetFilter}>
							<i className="fas fa-times" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
