const express = require('express')
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message : 'This is a GET request for the Orders'
    })
})

router.post('/', (req,res, next)=>{
    res.status(200).json({
        message : 'This is a POST request for the Orders'
    })
})

router.get('/:orderID',(req, res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message : 'GET request for perticuler Order ',
        id : id
    })
})

router.patch('/:orderID', (req,res,next)=>{
    const id = req.params.id;
    res.status(200).json({
        message : 'Update the Order',
        id: id
    })
})

router.delete('/:orderID', (req,res, next)=>{
    const id = req.params.id;
    res.status(200).json({
        message : 'Delete the Order'
    })
})


module.exports = router;