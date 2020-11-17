// console.log(process.env);
require('dotenv').config();

// console.log(process.env.SESSION_SECRET);

const express = require('express');
const app = express();
var bodyParser=require('body-parser');
var cookieParser = require('cookie-parser')
const port = 3000;


const userRoute= require('./routes/users.route');
const authRoute= require('./routes/auth.route');
const productRoute= require('./routes/product.route');
const authMiddleware= require('./middlewares/auth.middleware');
//routers
app.use(express.json()) ;// for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser(process.env.SESSION_SECRET));

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
app.use('/products', productRoute )

app.listen(3000, function () {
    console.log('Server listening on port ' + port);

});