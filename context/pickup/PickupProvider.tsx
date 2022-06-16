import { FC, useReducer } from "react";
import { Children, IPickupPoint } from "../../interfaces";
import { PickupContext, pickupReducer } from ".";

export interface PickupState {
  pickup: IPickupPoint;
}

const Pickup_INITIAL_STATE: PickupState = {
  pickup: {
    latitude: "45.51",
    longitude: "-122.68",
    name: "Oregon",
  },
};

export const PickupProvider: FC<Children> = ({ children }) => {
  const [state, dispatch] = useReducer(pickupReducer, Pickup_INITIAL_STATE);

  const setPickup = (pickup: IPickupPoint) => {
    dispatch({ type: "[Pickup] - Select address", payload: pickup });
  };

  return (
    <PickupContext.Provider
      value={{
        ...state,
        setPickup,
      }}>
      {children}
    </PickupContext.Provider>
  );
};
