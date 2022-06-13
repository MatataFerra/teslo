import { FC, useReducer } from "react";
import { Children, ProfileItems } from "../../interfaces";
import { ProfileContext, profileReducer } from ".";

export interface ProfileState {
  menu: ProfileItems;
}

const Profile_INITIAL_STATE: ProfileState = {
  menu: "Datos personales",
};

export const ProfileProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(profileReducer, Profile_INITIAL_STATE);

  const menuItemSelected = (menu: ProfileItems) => {
    dispatch({
      type: "[Profile] - Menu item selected",
      payload: menu,
    });
  };

  return (
    <ProfileContext.Provider
      value={{
        ...state,
        menuItemSelected,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
