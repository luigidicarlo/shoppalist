import React, { createContext, useState } from "react";
import { ModalsContextValue } from "../../types/contexts/modals-context-value";

interface IProps {
  children: React.ReactNode;
}

export const ModalsContext = createContext<ModalsContextValue>({
  isProductModalOpen: false,
  isUploadModalOpen: false,
  isCategoriesModalOpen: false,
  setIsProductModalOpen: () => {},
  setIsUploadModalOpen: () => {},
  setIsCategoriesModalOpen: () => {},
});

export const ModalsProvider: React.FC<IProps> = ({ children }) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);

  return (
    <ModalsContext.Provider
      value={{
        isProductModalOpen,
        setIsProductModalOpen,
        isUploadModalOpen,
        setIsUploadModalOpen,
        isCategoriesModalOpen,
        setIsCategoriesModalOpen,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
