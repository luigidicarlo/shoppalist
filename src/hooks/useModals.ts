import { useContext } from 'react';
import { ItemsContext } from '../components/Contexts/ItemsContext';
import { ModalsContext } from '../components/Contexts/ModalsContext';

export function useModals(resetForm?: () => void) {
	const {
		isItemModalOpen,
		isUploadModalOpen,
		setIsItemModalOpen,
		setIsUploadModalOpen,
	} = useContext(ModalsContext);

	const openItemModal = () => setIsItemModalOpen(true);

	const closeItemModal = () => {
		resetForm && resetForm();
		setIsItemModalOpen(false);
	};

	const openUploadModal = () => setIsUploadModalOpen(true);

	const closeUploadModal = () => setIsUploadModalOpen(false);

	return {
		isItemModalOpen,
		isUploadModalOpen,
		openItemModal,
		closeItemModal,
		openUploadModal,
		closeUploadModal,
	};
}
