import { ILoadingStatus, IOrder, IOrderStatus } from "../interfaces";

export const mapOrdersAddStatus = (data: IOrder[], loadingStatus: ILoadingStatus): IOrderStatus[] => {
  return data.map((order: IOrder) => {
    return {
      ...order,
      loadingStatus,
    };
  });
};

export const mapOrdersAddStatusById = (
  data: IOrderStatus[],
  loadingStatus: ILoadingStatus,
  id: string
): IOrderStatus[] => {
  return data.map((order: IOrderStatus) => {
    if (order._id === id) {
      return {
        ...order,
        loadingStatus,
      };
    }
    return order;
  });
};
