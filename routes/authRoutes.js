const express = require('express');
const { buyerSignUpController, buyerLoginController, sellerLoginController, sellerSignUpController, getAllSellers, getParticularSeller } = require('../controllers/authController');
const { getOrderFromBuyer, getAllOders } = require('../controllers/orderController');


const router = express.Router();


router.post('/buyersignup', buyerSignUpController);
router.post('/buyerlogin', buyerLoginController);


router.post('/sellersignup', sellerSignUpController);
router.post('/sellerlogin', sellerLoginController);



router.get('/buyerlogin/getsellers', getAllSellers);
router.get('/buyerlogin/getsellers/:id', getParticularSeller);


router.post('/buyerlogin/createOrder/:id',getOrderFromBuyer);


router.get('/sellerlogin/orders',getAllOders);


module.exports = router;