import { z } from 'zod';

// Variants Schema
const variantsSchemaValidation = z.object({
  type: z.string().min(1, { message: 'Type is required' }),
  value: z.string().min(1, { message: 'Value is required' }),
});

// Inventory Schema
const inventorySchemaValidation = z.object({
  quantity: z
    .number()
    .int()
    .min(0, { message: 'Quantity must be a positive integer' }),
  inStock: z.boolean({ required_error: 'InStock is required' }),
});

// Product Schema
const productSchemaValidation = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  price: z.number().positive({ message: 'Price must be a positive number' }),
  category: z.enum([
    'Electronics',
    'Fitness',
    'Footwear',
    'Kitchen',
    'Wearable',
    'Audio',
  ]),
  tags: z
    .array(z.string().min(1, { message: 'Tag cannot be empty' }))
    .min(1, { message: 'At least one tag is required' }),
  variants: z
    .array(variantsSchemaValidation)
    .min(1, { message: 'At least one variant is required' }),
  inventory: inventorySchemaValidation,
});

export default productSchemaValidation;
