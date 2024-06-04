import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getProducts);
router.get('/:productId', ProductController.getSingleProducts);
router.put('/:productId', ProductController.updateSingleProducts);
router.delete('/:productId', ProductController.deleteSingleProduct);

export const ProductRoutes = router;
