import { HeaderPopover } from './HeaderPopover';

export const Header: React.FC = () => {
	return (
		<header className="bg-blue-500 py-2 w-full">
			<div className="flex flex-wrap items-center justify-between text-white mx-auto">
				<HeaderPopover />
			</div>
		</header>
	);
};
