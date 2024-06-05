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
  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.deleteOne({ _id: id });
  return result;
};

const searchItemFromDB = async (searchKeyword: string) => {
  const regex = new RegExp(searchKeyword, 'i');
  const result = await ProductModel.find({
    $or: [
      { name: { $regex: regex } },
      { description: { $regex: regex } },
      { category: { $regex: regex } },
      { tags: { $regex: regex } },
    ],
  });
  return result;
};

const updateStockInDB = async (productId: string) => {
  const result = await ProductModel.findOneAndUpdate(
    { _id: productId },
    {
      inventory: { inStock: false },
    },
    {
      upsert: true,
    },
  );
  console.log('🚀 ~ updateStockInDB ~ result:', result);
};

export const ProductService = {
  createNewProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
  searchItemFromDB,
  updateStockInDB,
};
