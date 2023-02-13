import { inputStyles } from '../../constants/styles';
import { useItemsContext } from '../../hooks/useItemsContext';

export const FilterForm: React.FC = () => {
	const { filter, setFilter } = useItemsContext();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFilter(target.value);
	};

	return (
		<div className="flex items-center justify-center">
			<div className="fixed bottom-12 p-4 bg-white w-full shadow max-w-sm border-t border-gray-100">
				<input
					type="search"
					className={`${inputStyles} mb-0 text-lg text-black`}
					placeholder="Buscar"
					onChange={onChange}
					value={filter}
				/>
			</div>
		</div>
	);
};
