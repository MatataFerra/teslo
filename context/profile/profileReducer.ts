import { ProfileState } from ".";
import { ProfileItems } from "../../interfaces";

type ProfileActionType = { type: "[Profile] - Menu item selected"; payload: ProfileItems };

export const profileReducer = (state: ProfileState, action: ProfileActionType): ProfileState => {
  switch (action.type) {
    case "[Profile] - Menu item selected":
      return {
        ...state,
        menu: action.payload,
      };

    default:
      return state;
  }
};
