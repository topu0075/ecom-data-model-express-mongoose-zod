import { Request, Response } from 'express';
import { ProductService } from './product.service';

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;
    console.log('🚀 ~ createProduct ~ productData:', req.body);
    const result = await ProductService.createNewProductInDB(productData);
    res.status(200).json({});
  } catch (error) {
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
