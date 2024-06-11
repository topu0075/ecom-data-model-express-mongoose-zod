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
exports.ProductController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = __importDefault(require("./product.validation"));
//Create new products
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        productData.price = Number(productData.price);
        productData.inventory.quantity = Number(productData.inventory.quantity);
        const validatedData = product_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductService.createNewProductInDB(validatedData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: `Products not created successfully`,
            error,
        });
    }
});
//Products search controller
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    if (searchTerm) {
        getProductsBySearchTerm(searchTerm, res);
    }
    else {
        getAllProducts(res);
    }
});
//Get All the product
const getAllProducts = (res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductService.getAllProductsFromDB();
        let message = 'Products fetched successfully!';
        if (result.length == 0) {
            message = 'No Products found';
        }
        res.status(200).json({
            success: true,
            message: message,
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal Server Error. Could not fetch Products info',
        });
    }
});
//Get product by search term
const getProductsBySearchTerm = (searchTerm, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductService.searchItemFromDB(searchTerm);
        if (result.length <= 0) {
            throw new Error(`No products found matching search term ${searchTerm}!!`);
        }
        res.status(200).json({
            success: true,
            message: `Products matching search term ${searchTerm} fetched successfully!`,
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message,
            });
        }
    }
});
//Get products by product ID
const getSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Products fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'No Product found under this product Id.',
        });
    }
});
//Update Products info
const updateSingleProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const productData = req.body;
        productData.price = Number(productData.price);
        productData.inventory.quantity = Number(productData.inventory.quantity);
        const validatedData = product_validation_1.default.parse(productData);
        yield product_service_1.ProductService.updateSingleProductFromDB(productId, validatedData);
        res.status(200).json({
            success: true,
            message: 'Product is updated successfully',
            data: productData,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Internal Server Error. Could not update the product info',
        });
    }
});
//Delete Product info
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = product_service_1.ProductService.deleteSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product Deleted successfully',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Product deleted unsuccessfully',
        });
    }
});
exports.ProductController = {
    createProduct,
    getProducts,
    getSingleProducts,
    updateSingleProducts,
    deleteSingleProduct,
};
