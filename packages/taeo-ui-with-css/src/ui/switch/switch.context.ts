import * as React from "react";

import type { SwitchContextProps } from "./switch.type";

/**
 * @description this is Switch Context made bt createContext
 */

export const SwitchContext = React.createContext<SwitchContextProps>({
  isOn: false,
  toggle: () => {},
});

/**
 * @description this is hook for using in Switch Compound Component
 * @returns {context}
 */
export const useSwitchContext = () => {
  const context = React.useContext(SwitchContext);

  if (!context) {
    throw "Switch context's value is not provided...";
  }

  return context;
};
