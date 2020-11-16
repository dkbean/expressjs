const express = require('express');


const router = express.Router();

const validate=require('../validate/user.validate')
const controller=require('../controllers/user.controller');
const authMiddleware= require('../middlewares/auth.middleware');
// the files containing all of the functions will be used

//distribute functions 
router.get('/', controller.index);

router.get('/search', controller.search);

router.get('/cookie', function(req,res,next){
    res.cookie('user-id', 12345);
    res.send('Hello');
})

router.get('/create', controller.create);

router.get('/:id',controller.viewUser);

router.post('/create',validate.postCreate, controller.postCreate);

module.exports = router;