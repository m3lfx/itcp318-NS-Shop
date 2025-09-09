const express = require('express');
const router = express.Router();
const upload = require("../utils/multer");

const { 
    newProduct, getSingleProduct
    } = require('../controllers/product');

router.post('/admin/product/new', upload.array('images', 10), newProduct);
router.get('/product/:id', getSingleProduct)
module.exports = router