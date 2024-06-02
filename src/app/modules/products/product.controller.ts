import { Request, Response } from 'express';
import { ProductService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    productData.price = Number(productData.price);
    productData.inventory.quantity = Number(productData.inventory.quantity);
    const result = await ProductService.createNewProductInDB(productData);
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

export const ProductController = {
  createProduct,
};
