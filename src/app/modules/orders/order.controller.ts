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

    console.log('🚀 ~ createOrder ~ result:', result);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: orderData,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(400).json({
      success: false,
      message: 'Order not added successfully',
      error: error.message,
    });
  }
};

//Get all orders
const getAllOrders = async (req: Request, res: Response) => {
  const { email } = req.query;
  try {
    let result;
    if (email) {
      result = await OrderService.getOrdersByUserEmailFromDB(email as string);
      console.log('🚀 ~ getAllOrders ~ result:', result);
    } else {
      result = await OrderService.getOrdersFromDB();
      console.log('🚀 ~ getAllOrders ~ result:', result);
    }

    res.status(200).json({
      success: true,
      message: 'Orders fetched successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(200).json({
      success: true,
      message: error.message,
    });
  }
};

export const OrderController = {
  createOrder,
  getAllOrders,
};
