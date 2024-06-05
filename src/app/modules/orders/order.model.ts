import { Schema, model } from 'mongoose';
import { ProductService } from '../products/product.service';
import { Order } from './order.interface';

const orderSchema = new Schema<Order>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

orderSchema.pre('save', async function (next) {
  next();
});

orderSchema.post('save', async function (doc, next) {
  const test = await ProductService.updateStockInDB(doc.productId);
  console.log('🚀 ~ orderSchema.pre ~ test:', test);
  next();
});

export const OrderModel = model<Order>('Orders', orderSchema);
