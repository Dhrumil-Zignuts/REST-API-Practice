const express = require('express')
const mongoose = require('mongoose')
const Product = require('../Models/productSchema');

const getAllProduct = (req, res, next) => {
    Product.find()
        .select('productName productPrice _id productImage')
        .then((data) => {
            const response = {
                count: data.length,
                product: data.map(item => {
                    return {
                        productName: item.productName,
                        productPrice: item.productPrice,
                        productImage: item.productImage,
                        _id: item._id,
                        response: {
                            type: 'GET',
                            url: `http://localhost:3000/products/${item._id} `
                        }

                    }
                })
            }
            res.status(200).send(response)
        })
        .catch(err => {
            console.log(err);
        })
}

const addProduct = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        productName: req.body.productName,
        productPrice: req.body.productPrice,
        productImage: req.file.path
    })
    product.save()
        .then(() => {
            res.status(200).send(product)
        }).catch(err => {
            console.log(err);
        })
}

const getOneProduct = (req, res, next) => {
    const id = req.params.productID;
    console.log(id);
    Product.findById(id)
        .then((data) => {
            res.status(200).send(data);
        })
        .catch((err) => {
            console.log(err);
        })
}

const updateProduct = (req, res, next) => {
    const id = req.params.productID;

    Product.updateOne({ _id: id }, { $set: req.body })
        .then((data) => {
            res.status(200).json({
                message: 'data is updated'
            })
        })
        .catch(err => {
            console.log(err);
        })
}

const deleteProduct = (req, res, next) => {
    const id = req.params.productID;
    Product.findByIdAndDelete({ _id: id })
        .then((data) => {
            res.status(200).json({
                message: 'Item is Deleted..!!'
            })
        })
        .catch(err => {
            console.log(err);
        })
}


module.exports = {
    getAllProduct,
    addProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}