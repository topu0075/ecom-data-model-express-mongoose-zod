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
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Products not created successfully`,
      error,
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
    let message = 'Products fetched successfully!';
    if (result.length == 0) {
      message = 'No Products found';
    }
    res.status(200).json({
      success: true,
      message: message,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal Server Error. Could not fetch Products info',
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
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
};

//Get products by product ID

const getSingleProducts = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductService.getSingleProductFromDB(productId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'No Product found under this product Id.',
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
    await ProductService.updateSingleProductFromDB(productId, validatedData);
    res.status(200).json({
      success: true,
      message: 'Product is updated successfully',
      data: productData,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Internal Server Error. Could not update the product info',
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
      message: 'Product deleted unsuccessfully',
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
