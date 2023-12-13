const express = require('express');
const { getCatalogUpdated } = require('../controllers/productController');



const router = express.Router();


router.post('/sellerlogin/updatecatalog', getCatalogUpdated);




module.exports = router;