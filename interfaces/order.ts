import { IUser, ISize, IGender, ISizeStock } from "./";
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

  transactionId?: string;

  createdAt?: string;
  updatedAt?: string;
}

export interface IOrderItems {
  _id: string;
  gender: IGender;
  image: string;
  price: number;
  quantity: number;
  size?: ISizeStock;
  slug: string;
  title: string;
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
