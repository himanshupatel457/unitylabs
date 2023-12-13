const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoute');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
dotenv.config({path : 'env/secret.env'});

const app = express();


app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));


app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/auth', productRoutes);



app.get('/',(req,res,next)=>{
    res.send('<h1> Server is running');
})


module.exports = app;