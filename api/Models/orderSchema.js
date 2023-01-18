const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productID : {
        type : mongoose.Schema.Types.ObjectId, 
        ref : 'Product' 
    },
    quantity : {
        type : Number,
        default : 1
    } 
})

module.exports = mongoose.model('Order', orderSchema)