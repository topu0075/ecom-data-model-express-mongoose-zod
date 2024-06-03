import express from 'express';
import { ProductController } from './product.controller';

const router = express.Router();
router.post('/', ProductController.createProduct);
router.get('/', ProductController.getAllProducts);
router.get('/:productId', ProductController.getSingleProducts);
router.put('/:productId', ProductController.updateSingleProducts);

export const ProductRoutes = router;
