import { ISize, IGender } from ".";

export interface ICartProduct {
  _id: string;
  gender: IGender;
  image: string;
  price: number;
  productStock: number;
  quantity: number;
  restStock: number;
  size?: ISize;
  slug: string;
  title: string;
}
