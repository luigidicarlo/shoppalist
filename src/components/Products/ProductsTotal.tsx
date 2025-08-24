import { useProductsContext } from '../../hooks/useItemsContext';
import { getTotal } from '../../utils/calculations';

export const ProductsTotal: React.FC = () => {
	const { filteredProducts: filteredItems } = useProductsContext();

	return (
		<>
			{filteredItems.length > 0 && (
				<div className="bg-white py-2">
					<h2 className="text-xl text-center text-gray-700 select-none">
						<span className="font-bold">Total:</span>{' '}
						{Number(getTotal(filteredItems)).toFixed(3)}
					</h2>
				</div>
			)}
		</>
	);
};
