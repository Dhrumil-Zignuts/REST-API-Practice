const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/checkAuth')
const productController = require('../controller/productController')
const Product = require('../Models/productSchema');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './upload/')
    },
    filename: function(req,file,cb){
        cb(null, new Date().toISOString()+file.originalname)
    }
})

const fileFilter = function(req,file,cb){
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg'){
        cb(null,true);
    }else{
        cb(null, false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})


router.get('/', productController.getAllProduct)

router.post('/', checkAuth , upload.single('productImage'), productController.addProduct)

router.get('/:productID',checkAuth , productController.getOneProduct)

router.patch('/:productID',checkAuth , productController.updateProduct)

router.delete('/:productID',checkAuth , productController.deleteProduct)



module.exports = router;