import { Product } from "../types/models/product";

export const getSubtotal = (item: Product) => {
	return Number(item.quantity) * Number(item.price);
};

export const getTotal = (items: Product[]) => {
	return items.reduce((prev, curr) => Number((prev += getSubtotal(curr))), 0);
};
