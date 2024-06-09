"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Variants Schema
const variantsSchemaValidation = zod_1.z.object({
    type: zod_1.z.string().min(1, { message: 'Type is required' }),
    value: zod_1.z.string().min(1, { message: 'Value is required' }),
});
// Inventory Schema
const inventorySchemaValidation = zod_1.z.object({
    quantity: zod_1.z
        .number()
        .int()
        .min(0, { message: 'Quantity must be a positive integer' }),
    inStock: zod_1.z.boolean({ required_error: 'InStock is required' }),
});
// Product Schema
const productSchemaValidation = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: 'Name is required' }),
    description: zod_1.z.string().min(1, { message: 'Description is required' }),
    price: zod_1.z.number().positive({ message: 'Price must be a positive number' }),
    category: zod_1.z.enum([
        'Electronics',
        'Fitness',
        'Footwear',
        'Kitchen',
        'Wearable',
        'Audio',
    ]),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, { message: 'Tag cannot be empty' }))
        .min(1, { message: 'At least one tag is required' }),
    variants: zod_1.z
        .array(variantsSchemaValidation)
        .min(1, { message: 'At least one variant is required' }),
    inventory: inventorySchemaValidation,
});
exports.default = productSchemaValidation;
