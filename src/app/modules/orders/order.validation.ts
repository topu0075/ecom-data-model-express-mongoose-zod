import { z } from 'zod';
const orderSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  productId: z.string().min(1, { message: 'Product ID can not be empty' }),
  price: z.number().positive('Price must be greater than 0'),
  quantity: z.number().positive('Quantity must be greater than 0'),
});

export default orderSchema;
