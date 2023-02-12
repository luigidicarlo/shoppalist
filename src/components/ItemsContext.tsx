import { createContext, useState } from 'react';
import { IItem, IItemsContext } from '../interfaces';

export const ItemsContext = createContext<IItemsContext>({
	items: [],
	filteredItems: [],
	filter: '',
	setFilteredItems: () => {},
	setItems: () => {},
	setFilter: () => {},
});

interface IProps {
	children: React.ReactNode;
}

export const ItemsProvider: React.FC<IProps> = ({ children }) => {
	const rawItems = localStorage.getItem('items');
	const defaultItems = rawItems ? JSON.parse(rawItems) : [];
	const [items, setItems] = useState<IItem[]>(defaultItems);
	const [filteredItems, setFilteredItems] = useState<IItem[]>(items);
	const [filter, setFilter] = useState('');

	return (
		<ItemsContext.Provider
			value={{
				items,
				setItems,
				filteredItems,
				setFilteredItems,
				filter,
				setFilter,
			}}
		>
			{children}
		</ItemsContext.Provider>
	);
};
