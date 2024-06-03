import { Product } from './product.interface';
import { ProductModel } from './product.model';

const createNewProductInDB = async (productData: Product) => {
  const result = await ProductModel.create(productData);
  return result;
};

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find();
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id });
  console.log('🚀 ~ getSingleProductFromDB ~ result:', result);
  console.log('🚀 ~ getSingleProductFromDB ~ id:', id);
  return result;
};

const updateSingleProductFromDB = async (id: string, productData: Product) => {
  const result = await ProductModel.updateOne(
    { _id: id },
    { $set: productData },
  );
};

export const ProductService = {
  createNewProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
};
