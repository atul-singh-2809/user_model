const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function (err, hashedpass) {
        if (err) {
            res.json({
                error: err
            })
        }
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: hashedpass
        })
        user.save()
            .then(user => {
                res.json({
                    message: 'user added successfully'
                })
            })
            .catch(error => {
                res.json({
                    message: 'an error occured'
                })
            })
    })

}

// login
const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password


    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        res.json({
                            error: err
                        })
                    }
                    if (result) {
                        let token = jwt.sign({ name: user.name }, 'verySecretValue', { expiresIn: '1hr' })
                        res.json({
                            message: 'login successful',
                            token
                        })
                    }
                    else {
                        res.json({
                            message: 'password does not matches'
                        })
                    }
                })
            } else {
                res.json({
                    message: 'no user found'
                })
            }
        })
}

module.exports = {
    register,login
}