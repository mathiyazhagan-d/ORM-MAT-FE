import express from 'express';
import { isAdmin, protectRoute } from '../middleware/authMiddleware.js';
const router = express.Router();

import { 
    getProducts, 
    getProductById, 
    deleteProduct, 
    updateProduct, 
    createProduct, 
    addProductReview, 
    searchProducts, 
    getTopProducts, 
    getProductsByGenre, 
    getProductsByCategory, 
    bulkImport
} from '../controllers/productController.js';

router.route('/')
    .get(getProducts)
    .post(protectRoute, isAdmin, createProduct); 
router.get('/top', getTopProducts);

router.post('/bulkimport',bulkImport);

router.get('/genre/:genre', getProductsByGenre);

router.route('/search/:keyword').get(searchProducts);

router.route('/:id')
    .get(getProductById)
    .delete(protectRoute, isAdmin, deleteProduct)
    .put(protectRoute, isAdmin, updateProduct);

router.route('/:id/reviews').post(protectRoute, addProductReview);

router.get('/category/:category', getProductsByCategory);

export default router;
