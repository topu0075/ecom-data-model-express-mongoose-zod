import { Schema, model } from 'mongoose';
import { Inventory, Product, Variants } from './product.interface';

const variantsSchema = new Schema<Variants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

const inventorySchema = new Schema<Inventory>({
  quantity: {
    type: Number,
    require: true,
  },
  inStock: {
    type: Boolean,
    require: true,
  },
});

const productSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Electronics',
      'Fitness',
      'Footwear',
      'Kitchen',
      'Wearable',
      'Audio',
    ],

    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: {
    type: [variantsSchema],
    required: true,
  },
  inventory: {
    type: inventorySchema,
    required: true,
  },
});

export const ProductModel = model<Product>('Products', productSchema);
