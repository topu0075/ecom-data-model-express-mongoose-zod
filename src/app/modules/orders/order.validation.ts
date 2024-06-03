const { z } = require('zod');

const orderSchema = z.object({
  email: z.string().nonempty(),
  productId: z.string().nonempty(),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
});

export default orderSchema;
