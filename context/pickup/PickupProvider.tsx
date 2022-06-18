import { FC, useReducer } from "react";
import { Children, IPickupPoint, PickupModalActions } from "../../interfaces";
import { PickupContext, pickupReducer } from ".";
import { defaultPickup } from "../../utils";

export interface PickupState {
  pickup: IPickupPoint;
  pickupModal: boolean;
}

const Pickup_INITIAL_STATE: PickupState = {
  pickup: defaultPickup,
  pickupModal: false,
};

export const PickupProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(pickupReducer, Pickup_INITIAL_STATE);

  const setPickup = (pickup: IPickupPoint) => {
    dispatch({ type: "[Pickup] - Select address", payload: pickup });
  };

  const onPickupModal = (action: PickupModalActions) => {
    dispatch({ type: action });
  };

  return (
    <PickupContext.Provider
      value={{
        ...state,
        setPickup,
        onPickupModal,
      }}>
      {children}
    </PickupContext.Provider>
  );
};
