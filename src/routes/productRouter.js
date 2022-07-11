import { Router } from 'express';
import validateProduct from '../middlewares/validateProduct.js';
import { putProduct } from '../controllers/productController.js';

const router = Router();

router.post('/shopping-cart', validateProduct, putProduct);

export default router;