import { ISize, IGender, ISizeStock } from ".";

export interface ICartProduct {
  _id: string;
  gender: IGender;
  image: string;
  price: number;
  quantity: number;
  size?: ISizeStock;
  slug: string;
  title: string;
}
