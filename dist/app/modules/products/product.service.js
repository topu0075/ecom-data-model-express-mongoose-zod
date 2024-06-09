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
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createNewProductInDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(productData);
    return result;
});
const getAllProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.find();
    return result;
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: id });
    return result;
});
const updateSingleProductFromDB = (id, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.updateOne({ _id: id }, { $set: productData });
    return result;
});
const deleteSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.deleteOne({ _id: id });
    return result;
});
const searchItemFromDB = (searchKeyword) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchKeyword, 'i');
    const result = yield product_model_1.ProductModel.find({
        $or: [
            { name: { $regex: regex } },
            { description: { $regex: regex } },
            { category: { $regex: regex } },
            { tags: { $regex: regex } },
        ],
    });
    return result;
});
const inventoryCheck = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: productId });
    return result && (result === null || result === void 0 ? void 0 : result.inventory.quantity) >= quantity ? true : false;
});
const updateStockInDB = (productId, quantity) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findOne({ _id: productId });
    if (result) {
        if (result.inventory.quantity - quantity === 0) {
            result.inventory.quantity = 0;
            result.inventory.inStock = false;
        }
        else {
            result.inventory.quantity = (result === null || result === void 0 ? void 0 : result.inventory.quantity) - quantity;
        }
        updateSingleProductFromDB(productId, result);
    }
});
exports.ProductService = {
    createNewProductInDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    updateSingleProductFromDB,
    deleteSingleProductFromDB,
    searchItemFromDB,
    updateStockInDB,
    inventoryCheck,
};
