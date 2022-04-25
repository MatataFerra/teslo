import { IUser, ISize, IGender } from "./";
export interface IOrder {
  _id?: string;
  user?: IUser | string;
  orderItems: IOrderItems[];
  shippingAddress: ShippingAddress;
  paymentResult?: string;
  numberOfItems: number;
  total: number;
  subTotal: number;
  tax: number;

  isPaid: boolean;
  paidAt?: string;
}

export interface IOrderItems {
  _id: string;
  title: string;
  size?: ISize;
  quantity: number;
  slug: string;
  image: string;
  price: number;
  gender: IGender;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}
