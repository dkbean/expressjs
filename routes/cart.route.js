const express = require('express');

const router = express.Router();
const controller=require('../controllers/cart.controller');

router.get('/add/:productID', controller.addToCart);

router.get('/view', controller.viewCart);


module.exports = router;
