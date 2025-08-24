import { ReactDispatch } from '../utils';

export type ModalsContextValue = {
	isProductModalOpen: boolean;
	setIsProductModalOpen: ReactDispatch<boolean>;
	isCategoriesModalOpen: boolean;
	setIsCategoriesModalOpen: ReactDispatch<boolean>;
	isUploadModalOpen: boolean;
	setIsUploadModalOpen: ReactDispatch<boolean>;
};
