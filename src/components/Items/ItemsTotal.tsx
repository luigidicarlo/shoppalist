import { useItemsContext } from '../../hooks/useItemsContext';
import { getTotal } from '../../utils/calculations';

export const ItemsTotal: React.FC = () => {
	const { items } = useItemsContext();

	return (
		<>
			{items.length > 0 && (
				<div className="fixed top-0 left-0 w-full bg-white py-2 shadow">
					<h2 className="text-xl text-center text-gray-700 select-none">
						<span className="font-bold">Total:</span>{' '}
						{Number(getTotal(items)).toFixed(3)}
					</h2>
				</div>
			)}
		</>
	);
};
