import { PickupState } from ".";
import { IPickupPoint } from "../../interfaces";

type PickupActionType =
  | { type: "[Pickup] - Select address"; payload: IPickupPoint }
  | { type: "[Pickup] - Open modal" }
  | { type: "[Pickup] - Close modal" };

export const pickupReducer = (state: PickupState, action: PickupActionType): PickupState => {
  switch (action.type) {
    case "[Pickup] - Select address":
      return {
        ...state,
        pickup: action.payload,
      };

    case "[Pickup] - Open modal":
      return {
        ...state,
        pickupModal: true,
      };

    case "[Pickup] - Close modal":
      return {
        ...state,
        pickupModal: false,
      };

    default:
      return state;
  }
};
