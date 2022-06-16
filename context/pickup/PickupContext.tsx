import { createContext } from "react";
import { IPickupPoint } from "../../interfaces";

interface ContextProps {
  pickup: {
    latitude: string;
    longitude: string;
    name: string;
  };
  setPickup: (pickup: IPickupPoint) => void;
}

export const PickupContext = createContext({} as ContextProps);
