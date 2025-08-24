import { Category } from "../models/category";

export type CategoryFormState = {
  name: string;
  categoryToEdit?: Category;
};