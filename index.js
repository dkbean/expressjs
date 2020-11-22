// console.log(process.env);
require('dotenv').config();

// console.log(process.env.SESSION_SECRET);

const express = require('express');
const app = express();
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser')
var csurf = require('csurf');
const mongoose = require('mongoose');


mongoose.connect(process.env.MONGO_URL);

const port = 3000;

const userRoute= require('./routes/users.route');
const authRoute= require('./routes/auth.route');
const productRoute= require('./routes/product.route');
const cartRoute= require('./routes/cart.route');
const transferRoute = require('./routes/transfer.route');

const apiProductRoute= require('./api/routes/product.route');

//routers

const authMiddleware= require('./middlewares/auth.middleware');
const sessionMiddleware= require('./middlewares/session.middleware');
//Middlewares
app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);



app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index.pug',{
        friends: 01,
        name : 'Vinh',
        age: 18,
        a: [1,2,3],
    });
});

app.use('/users',authMiddleware.requireAuth ,userRoute);
app.use('/auth',authRoute);
app.use('/products', productRoute );
app.use('/cart', cartRoute);
app.use('/api/products', apiProductRoute);
app.use(csurf({ cookie: true }));
app.use('/transfer', authMiddleware.requireAuth, transferRoute);



app.listen(3000, function () {
    console.log('Server listening on port ' + port);

});