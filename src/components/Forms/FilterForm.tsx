import { inputStyles } from '../../constants/styles';
import { useItemsContext } from '../../hooks/useItemsContext';

export const FilterForm: React.FC = () => {
	const { filter, setFilter } = useItemsContext();

	const onChange: React.ChangeEventHandler<HTMLInputElement> = ({ target }) => {
		setFilter(target.value);
	};

	return (
		<div className="fixed bottom-12 left-0 p-4 bg-white w-full shadow-inner">
			<input
				type="search"
				className={`${inputStyles} mb-0 text-lg text-black`}
				placeholder="Buscar"
				onChange={onChange}
				value={filter}
			/>
		</div>
	);
};
