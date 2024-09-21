import { createContext, useContext } from "react";
import type { BottomSheetContextProps } from "./bottomSheet.type";

/**
 * @description this is Bottom-Sheet Context made bt createContext
 */

export const BottomSheetContext = createContext<BottomSheetContextProps>({
  onDragEnd: () => {},
  controls: undefined,
  setIsOpen: () => {},
  isOpen: true,
});

/**
 * @description this is hook for using in Bottom-Sheet Compound Component
 * @returns {context}
 */

export const useBottomSheetContext = () => {
  const context = useContext(BottomSheetContext);

  if (!context) {
    throw "Bottom Sheet context's value is not provided...";
  }

  return context;
};
