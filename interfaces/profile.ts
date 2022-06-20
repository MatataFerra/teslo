import { ItemClicked } from "../components/profile";

export interface Items {
  itemClicked: ItemClicked;
}

export interface Item {
  isClicked: boolean;
  label: string;
}
export type ProfileItems = keyof ItemClicked;
