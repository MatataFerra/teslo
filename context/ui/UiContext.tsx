import { createContext } from "react";
import { UiActionType } from "./";

interface ContextProps {
  isMenuOpen: boolean;
  toogleSideMenu: () => void;
}

export const UiContext = createContext({} as ContextProps);
