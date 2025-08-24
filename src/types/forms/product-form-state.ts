import { Product } from '../models/product';

export type ProductFormState = {
  name: string;
  quantity?: string;
  price?: string;
  categoryId?: string;
};
