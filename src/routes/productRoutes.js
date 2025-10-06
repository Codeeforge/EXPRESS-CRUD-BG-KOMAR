const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductsById);
router.post('/', upload.single('fotoProduct'), productController.createProduct);
router.put('/:id', upload.single('fotoProduct'), productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
