const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');


router.get('/', productController.getProducts);


router.post('/',upload.single('fotoProduct'),productController.createProduct);

module.exports = router;

