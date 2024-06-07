import { Request, Response } from 'express';
import { ProductService } from './product.service';
import productSchemaValidation from './product.validation';

//Create new products

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    productData.price = Number(productData.price);
    productData.inventory.quantity = Number(productData.inventory.quantity);
    const validatedData = productSchemaValidation.parse(productData);
    const result = await ProductService.createNewProductInDB(validatedData);
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
    });
  }
};

//Products search controller

const getProducts = async (req: Request, res: Response) => {
  const { searchTerm } = req.query;
  if (searchTerm) {
    getProductsBySearchTerm(searchTerm as string, res);
  } else {
    getAllProducts(res);
  }
};

//Get All the product

const getAllProducts = async (res: Response) => {
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

//Get product by search term

const getProductsBySearchTerm = async (searchTerm: string, res: Response) => {
  try {
    const result = await ProductService.searchItemFromDB(searchTerm as string);
    if (result.length <= 0) {
      throw new Error(`No products found matching search term ${searchTerm}!!`);
    }
    res.status(200).json({
      success: true,
      message: `Products matching search term ${searchTerm} fetched successfully!`,
      data: result,
    });
  } catch (error: any) {
    console.log();
    res.status(500).json({
      success: false,
      message: error.message,
      error,
    });
  }
};

//Get products by product ID

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
      message: 'Product not found.',
    });
  }
};

//Update Products info

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

//Delete Product info

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

export const ProductController = {
  createProduct,
  getProducts,
  getSingleProducts,
  updateSingleProducts,
  deleteSingleProduct,
};
