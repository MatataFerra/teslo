import { FC, useReducer } from "react";
import { UiContext, uiReducer } from "./";
import { Children } from "../../interfaces";

export interface UiState {
  isMenuOpen: boolean;
}

const Ui_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, Ui_INITIAL_STATE);

  const toogleSideMenu = () => dispatch({ type: "[UI] - ToogleMenu" });

  return (
    <UiContext.Provider
      value={{
        ...state,
        toogleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
