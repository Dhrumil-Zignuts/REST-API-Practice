const Order = require('../Models/orderSchema')
const Product = require('../Models/productSchema')

const getAllOrder = (req, res, next) => {
    Order.find()
    .populate('productID')
        .then(data => {
            res.status(200).send(data)
        })
        .catch(err => {
            console.log(err);
        })
}

const addOrder = (req, res, next) => {
    Product.findOne({ _id: req.body.productID })
        .then((product) => {
            if(!product){
                res.status(404).json({
                    message : 'Page is not Found'
                })
            }
            const order = new Order({
                productID: req.body.productID,
                quantity: req.body.quantity
            })
            return order.save()
        })
        .then(order => {
            res.status(200).send(order)
        })
        .catch(err => {
            res.json({
                message : 'Product is not Found',
                error : err
            })
            // console.log(err);
        })

}

const getOneOrder = (req, res, next) => {
    const id = req.params.orderID;
    Order.findById({ _id: id })
        .then(order => {
            if(!order){
                res.status(404).json({
                    message: 'Order Not Found'
                })
            }
            res.status(200).send(order)
        })
        .catch(err => {
            console.log(err);
        })
}

const updateOrder = (req, res, next) => {
    const id = req.params.orderID;
    Order.updateOne({ _id: id }, { $set: req.body })
        .then(data => {
            res.status(200).send('Data is Updated')
        })
        .catch(err => {
            console.log(err);
        })
}

const deleteOrder = (req, res, next) => {
    const id = req.params.orderID;
    Order.deleteOne({ _id: id })
        .then(() => {
            res.status(200).send('Item Deleted Successfully..!!')
        })
        .catch(err => {
            console.log(err);
        })
}

module.exports = {
    getAllOrder,
    getOneOrder,
    addOrder,
    updateOrder,
    deleteOrder
}