"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const orderSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, { message: 'Email is required' }),
    productId: zod_1.z.string().min(1, { message: 'Product ID can not be empty' }),
    price: zod_1.z.number().positive('Price must be greater than 0'),
    quantity: zod_1.z.number().positive('Quantity must be greater than 0'),
});
exports.default = orderSchema;
