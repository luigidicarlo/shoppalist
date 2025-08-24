import { FC, MouseEventHandler, ReactNode } from 'react';

export enum ButtonVariation {
	PRIMARY = 'primary',
	ADD = 'add',
	DANGER = 'danger'
}

type Props = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	variation?: ButtonVariation;
	type?: 'button' | 'submit' | 'reset' | undefined;
	title?: string;
	disabled?: boolean;
	children?: ReactNode;
};

export const Button: FC<Props> = ({
	onClick = () => {},
	variation = ButtonVariation.PRIMARY,
	type = 'button',
	title = '',
	disabled = false,
	children = null
}) => {
	const getClassnames = () => {
		let result =
			'flex items-center justify-center text-white px-4 py-2 cursor-pointer';

		if (variation === ButtonVariation.PRIMARY) {
			result += ' bg-green-700 rounded-md disabled:bg-gray-300';
		}

		if (variation === ButtonVariation.ADD) {
			result += ' bg-blue-700 rounded-full disabled:bg-gray-300';
		}

		if (variation === ButtonVariation.DANGER) {
			result += ' bg-red-600 rounded-md disabled:bg-gray-300';
		}

		return result;
	};

	return (
		<button
			type={type}
			className={getClassnames()}
			onClick={onClick}
			title={title}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
