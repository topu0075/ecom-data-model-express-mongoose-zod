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

const inventoryCheck = async (productId: string, quantity: number) => {
  const result = await ProductModel.findOne({ _id: productId });
  return result && result?.inventory.quantity >= quantity ? true : false;
};

const updateStockInDB = async (productId: string, quantity: number) => {
  const result = await ProductModel.findOne({ _id: productId });
  if (result) {
    if (result.inventory.quantity - quantity === 0) {
      result.inventory.quantity = 0;
      result.inventory.inStock = false;
    } else {
      result.inventory.quantity = result?.inventory.quantity - quantity;
    }
    updateSingleProductFromDB(productId, result);
  }
};

export const ProductService = {
  createNewProductInDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductFromDB,
  deleteSingleProductFromDB,
  searchItemFromDB,
  updateStockInDB,
  inventoryCheck,
};
