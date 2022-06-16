import { FC, useReducer } from "react";
import { Children, IPickupPoint } from "../../interfaces";
import { PickupContext, pickupReducer } from ".";

export interface PickupState {
  pickup: IPickupPoint;
}

const Pickup_INITIAL_STATE: PickupState = {
  pickup: {
    latitude: "-34.57873740816326",
    longitude: "-58.49272191020408",
    name: "Busque su ubicación",
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
