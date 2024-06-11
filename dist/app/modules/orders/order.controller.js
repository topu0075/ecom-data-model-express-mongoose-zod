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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const order_validation_1 = __importDefault(require("./order.validation"));
//Create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        orderData.price = Number(orderData.price);
        orderData.quantity = Number(orderData.quantity);
        const orderValidatedInfo = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderService.createOrderInDB(orderValidatedInfo);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        console.log(error);
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error,
            });
        }
    }
});
//Get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        let result;
        if (email) {
            result = yield order_service_1.OrderService.getOrdersByUserEmailFromDB(email);
        }
        else {
            result = yield order_service_1.OrderService.getOrdersFromDB();
        }
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        }
        else {
            message = 'Order not found';
        }
        res.status(400).json({
            success: false,
            message: message,
        });
    }
});
exports.OrderController = {
    createOrder,
    getAllOrders,
};
