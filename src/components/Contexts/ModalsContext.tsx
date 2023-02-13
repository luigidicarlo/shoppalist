import React, { createContext, useState } from 'react';
import { IModalsContext } from '../../interfaces';

interface IProps {
	children: React.ReactNode;
}

export const ModalsContext = createContext<IModalsContext>({
	isItemModalOpen: false,
	isUploadModalOpen: false,
	setIsItemModalOpen: () => {},
	setIsUploadModalOpen: () => {},
});

export const ModalsProvider: React.FC<IProps> = ({ children }) => {
	const [isItemModalOpen, setIsItemModalOpen] = useState(false);
	const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

	return (
		<ModalsContext.Provider
			value={{
				isItemModalOpen,
				setIsItemModalOpen,
				isUploadModalOpen,
				setIsUploadModalOpen,
			}}
		>
			{children}
		</ModalsContext.Provider>
	);
};
