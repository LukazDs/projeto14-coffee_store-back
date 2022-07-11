import { Router } from 'express';
import validateProduct from '../middlewares/validateProduct.js';
import { getProducts, putProduct, putAddress } from '../controllers/productController.js';
import validateUser from '../middlewares/validateUser.js';

const router = Router();

router.post('/shopping-cart', validateProduct, putProduct);
router.get('/shopping-cart', validateUser, getProducts);
router.post("/checkout", validateUser, putAddress)

export default router;