import { createContext } from "react";
import { IPickupPoint, PickupModalActions } from "../../interfaces";

interface ContextProps {
  pickup: {
    latitude: string;
    longitude: string;
    name: string;
  };
  pickupModal: boolean;
  setPickup: (pickup: IPickupPoint) => void;
  onPickupModal: (action: PickupModalActions) => void;
}

export const PickupContext = createContext({} as ContextProps);
