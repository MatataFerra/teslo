import { PickupState } from ".";
import { IPickupPoint } from "../../interfaces";

type PickupActionType = { type: "[Pickup] - Select address"; payload: IPickupPoint };

export const pickupReducer = (state: PickupState, action: PickupActionType): PickupState => {
  switch (action.type) {
    case "[Pickup] - Select address":
      return {
        ...state,
        pickup: action.payload,
      };

    default:
      return state;
  }
};
