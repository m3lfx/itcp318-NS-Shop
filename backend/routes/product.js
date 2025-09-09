const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { 
    newProduct, 
    getSingleProduct, 
    getAdminProducts,
    updateProduct,
    deleteProduct,
    } = require('../controllers/product');

router.post('/admin/product/new', upload.array('images', 10), newProduct);
router.get('/product/:id', getSingleProduct)
router.get('/admin/products', getAdminProducts);
router.put('/admin/product/:id', upload.array('images', 10), updateProduct);

router.delete('/admin/product/:id', deleteProduct);
module.exports = router