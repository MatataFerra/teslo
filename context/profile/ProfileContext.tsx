import { createContext } from "react";
import { ProfileItems } from "../../interfaces";

interface ContextProps {
  menu: ProfileItems;
  menuItemSelected: (menu: ProfileItems) => void;
}

export const ProfileContext = createContext({} as ContextProps);
