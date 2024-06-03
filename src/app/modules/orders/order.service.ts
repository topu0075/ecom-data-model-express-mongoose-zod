import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (orderData: Order) => {
  const result = await OrderModel.create(orderData);
  return result;
};

export const OrderService = {
  createOrderInDB,
};
