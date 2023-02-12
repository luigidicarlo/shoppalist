export interface IItem {
	id: string;
	name: string;
	quantity?: string;
	price?: string;
}

export interface IFormState {
	name: string;
	quantity?: string;
	price?: string;
	itemToEdit?: IItem;
}

export interface IItemsContext {
	items: IItem[];
	filteredItems: IItem[];
	filter: string;
	setItems: React.Dispatch<React.SetStateAction<IItem[]>>;
	setFilteredItems: React.Dispatch<React.SetStateAction<IItem[]>>;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export interface IModalsContext {
	isItemModalOpen: boolean;
	setIsItemModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isUploadModalOpen: boolean;
	setIsUploadModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
