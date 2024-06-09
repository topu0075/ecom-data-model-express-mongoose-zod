"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = require("mongoose");
const product_service_1 = require("../products/product.service");
const orderSchema = new mongoose_1.Schema({
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
orderSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const inventoryCheck = yield product_service_1.ProductService.inventoryCheck(this.productId, this.quantity);
        if (!inventoryCheck) {
            throw new Error('Insufficient quantity available in inventory');
        }
        next();
    });
});
orderSchema.post('save', function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield product_service_1.ProductService.updateStockInDB(doc.productId, doc.quantity);
        // console.log('🚀 ~ orderSchema.pre ~ test:', test);
        next();
    });
});
exports.OrderModel = (0, mongoose_1.model)('Orders', orderSchema);
