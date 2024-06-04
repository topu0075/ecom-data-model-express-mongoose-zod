const { z } = require('zod');

const orderSchema = z.object({
  email: z.string().email().min(1, { message: 'Email is required' }),
  productId: z.string().min(1, { message: 'Product ID can not be empty' }),
  price: z.number().int().positive('Price must be greater than 0'),
  quantity: z.number().int().positive('Quantity must be greater than 0'),
});

export default orderSchema;
