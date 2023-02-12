import { useState } from 'react';
import { IFormState } from '../interfaces';

export function useForm(defaultValue: IFormState) {
	const [formState, setFormState] = useState(defaultValue);

	const resetForm = () => {
		setFormState(defaultValue);
	};

	return { formState, setFormState, resetForm };
}
