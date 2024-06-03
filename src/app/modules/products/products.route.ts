import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProducts);
router.put('/:productId', ProductController.updateSingleProducts);
router.delete('/:productId', ProductController.deleteSingleProduct);
router.get('/searchTerm=:searchKeyword', ProductController.searchProducts);

export const ProductRoutes = router;
