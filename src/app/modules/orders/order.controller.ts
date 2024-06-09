import { Request, Response } from 'express';
import { OrderService } from './order.service';
import orderSchema from './order.validation';

//Create order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    orderData.price = Number(orderData.price);
    orderData.quantity = Number(orderData.quantity);
    const orderValidatedInfo = orderSchema.parse(orderData);
    const result = await OrderService.createOrderInDB(orderValidatedInfo);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    let result;
    if (email) {
      result = await OrderService.getOrdersByUserEmailFromDB(email as string);
    } else {
      result = await OrderService.getOrdersFromDB();
    }
    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error) {
    let message;
    if (error instanceof Error) {
      message = error.message;
    } else {
      message = 'Order not found';
    }
    res.status(400).json({
      success: false,
      message: message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
