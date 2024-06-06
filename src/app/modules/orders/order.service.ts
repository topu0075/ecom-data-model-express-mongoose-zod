import { Order } from './order.interface';
import { OrderModel } from './order.model';

const createOrderInDB = async (orderData: Order) => {
  const result = await OrderModel.create(orderData);
  return result;
};

const getOrdersFromDB = async () => {
  const result = await OrderModel.find();
  return result;
};

const getOrdersByUserEmailFromDB = async (email: string) => {
  const result = await OrderModel.find({
    email: email,
  });
  if (result.length == 0) {
    throw new Error('Order not found');
  }
  return result;
};
export const OrderService = {
  createOrderInDB,
  getOrdersFromDB,
  getOrdersByUserEmailFromDB,
};
