const express = require('express');
const router = express.Router();

router.get('/', (req, res, next )=>{
    res.status(200).json({
        message : 'This is Handling the products GET request..'
    })
})

router.post('/', (req, res, next )=>{
    res.status(200).json({
        message : 'This is Handling the products POST request..'
    })
})

router.get('/:productID', (req, res, next )=>{
    const id = req.params.id
    if( id === 'special'){
        res.status(200).json({
            message : 'You Discovered Special id',
            id : id
        })
    }else{
        res.status(200).json({
            message: 'you passed a Product ID'
        })
    }
})

router.patch('/:productID', (req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message : 'Update the Product'
    })
})

router.delete('/:productID', ( req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message: 'Delete the Products'
    })
})



module.exports = router;