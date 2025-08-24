import { useState } from 'react';
import { ProductFormState } from '../types/forms/product-form-state';

export function useForm(defaultValue: ProductFormState) {
	const [formState, setFormState] = useState(defaultValue);

	const resetForm = () => {
		setFormState(defaultValue);
	};

	return { formState, setFormState, resetForm };
}
