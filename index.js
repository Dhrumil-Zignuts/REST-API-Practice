const express = require('express');


// Create a App Here
app = express();

// Routes comes from here
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products',productRoutes);
app.use('/orders',orderRoutes);

//Middleware 
app.use(express.json());
app.use(express.urlencoded());


port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port number ${port}`);
})