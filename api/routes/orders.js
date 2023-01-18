const express = require('express')
const router = express.Router();
const checkAuth = require('../middleware/checkAuth')
const orderController = require('../controller/orderController')


router.get('/', checkAuth , orderController.getAllOrder)

router.post('/', checkAuth , orderController.addOrder)

router.get('/:orderID', checkAuth , orderController.getOneOrder)

router.patch('/:orderID', checkAuth , orderController.updateOrder)

router.delete('/:orderID', checkAuth , orderController.deleteOrder)


module.exports = router;