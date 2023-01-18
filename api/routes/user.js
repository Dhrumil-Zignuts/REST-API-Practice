const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')


router.get('/', userController.getAllAccount)

router.post('/signup', userController.signup)

router.post('/login', userController.login)

router.delete('/:userID', userController.deleteAccount)

module.exports = router;