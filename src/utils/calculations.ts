import { IItem } from '../interfaces';

export const getSubtotal = (item: IItem) => {
	return Number(item.quantity) * Number(item.price);
};

export const getTotal = (items: IItem[]) => {
	return items.reduce((prev, curr) => Number((prev += getSubtotal(curr))), 0);
};
