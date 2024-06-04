import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productSchemaValidation from './product.validation';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    productData.price = Number(productData.price);
    productData.inventory.quantity = Number(productData.inventory.quantity);
    const validatedData = productSchemaValidation.parse(productData);
    const result = await ProductService.createNewProductInDB(validatedData);
    console.log('🚀 ~ createProduct ~ result:', result);

    res.status(200).json({
      success: true,
      message: 'Product is created successfully',
      data: productData,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: 'Products not created successfully',
      error,
    });
  }
};

//GET all products
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductFromDB(productId);
    console.log('🚀 ~ getSingleProducts ~ productId:', productId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

const updateSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const productData = req.body;
    productData.price = Number(productData.price);
    productData.inventory.quantity = Number(productData.inventory.quantity);
    const validatedData = productSchemaValidation.parse(productData);
    const result = await ProductService.updateSingleProductFromDB(
      productId,
      validatedData,
    );
    console.log('🚀 ~ createProduct ~ result:', result);

    res.status(200).json({
      success: true,
      message: 'Product is updated successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = ProductService.deleteSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Product Deleted successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

const searchProducts = async (req: Request, res: Response) => {
  try {
    const temp = req.query;
    console.log('🚀 ~ searchProducts ~ temp:', temp);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
      error,
    });
  }
};

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateSingleProducts,
  deleteSingleProduct,
  searchProducts,
};
