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
