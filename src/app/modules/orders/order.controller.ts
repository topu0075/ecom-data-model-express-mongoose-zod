import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderSchema from './order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    orderData.price = Number(orderData.price);
    orderData.quantity = Number(orderData.quantity);
    const orderValidatedInfo = orderSchema.parse(orderData);
    const result = await OrderService.createOrderInDB(orderValidatedInfo);
    console.log('🚀 ~ createOrder ~ result:', result);
    res.status(200).json({
      success: true,
      message: 'Order added successfully',
      data: orderData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Order not added successfully',
      error,
    });
  }
};

export const OrderController = {
  createOrder,
};
