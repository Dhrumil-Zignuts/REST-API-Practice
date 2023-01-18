const express = require('express');
const morgan = require('morgan');
const dbConnect = require('./connectDB');

// Create a App Here
app = express();


//Middleware 
app.use('/upload',express.static('upload'));
app.use(express.json());
app.use(express.urlencoded());

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Header',
        'origin, X-Requested-With, Content-Type, Accept, Authorization'
    )
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, GET, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
})

// Routes comes from here
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

app.use(morgan('dev'));

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found 404');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        message : error.message
    })
})

port = process.env.PORT || 3000;

app.listen(port, dbConnect(port));