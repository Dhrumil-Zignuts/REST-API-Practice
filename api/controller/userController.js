const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../Models/userSchema')

const getAllAccount = (req, res) => {
    User.find().then((user) => {
        res.status(200).send(user)
    }).catch(err => {
        res.status(500).send(err)
    })
}

const signup = (req, res) => {
    User.find({ email: req.body.email }).then((user) => {
        if (user.length >= 1) {
            res.status(409).json({
                message: 'User Exists'
            })
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                console.log(req.body);
                console.log(hash);
                if (err) {
                    res.status(500).json({
                        error: err
                    })
                } else {
                    const user = new User({
                        email: req.body.email,
                        password: hash
                    })
                    console.log(user);
                    user.save().then(() => {
                        res.status(201).json({
                            message: "user is Created"
                        })
                    }).catch((err) => {
                        res.status(500).json({
                            message: "error in catch block",
                            error: err
                        })
                    })
                }
            })
        }
    })
}

const login = (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user < 1) {
            res.status(200).json({
                message: 'Auth Fail'
            })
        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    res.status(401).json({
                        message: 'Auth failed'
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user.email,
                        userID: user._id
                    },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        })

                    res.status(201).json({
                        message: 'Auth Successful',
                        token: token
                    })
                } else {
                    res.status(500).json({
                        message: 'Auth failed'
                    })
                }
            })
        }

    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}

const deleteAccount = (req, res) => {
    User.deleteOne({ _id: req.params.userID }).then((user) => {
        res.status(200).json({
            message: 'User is Deleted Successfully'
        })
    }).catch((err) => {
        res.status(500).json({
            error: err
        })
    })
}

module.exports = {
    getAllAccount,
    signup,
    login,
    deleteAccount
}