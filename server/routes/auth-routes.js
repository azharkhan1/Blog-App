const express = require('express');
const router = express.Router();
const { User } = require("../model/index");
const bcrypt = require('bcrypt-inzi');
const jwt = require("jsonwebtoken");




router.post('/signup', async (req, res) => {


    if (!req.body.email || !req.body.password || !req.body.name) {
        res.send({
            message: "please send name , email , password in json body"
        });
        return;
    }
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(401).json({
                message: "User already exists"
            });
        };
        let hashPassword = await bcrypt.stringToHash(req.body.password);
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            role: "user",
        });
        newUser.save();

        res.send({
            message: "Signup successfully"
        })
    } catch (err) {
        res.json({
            message: 'server error'
        })
    }



})

router.post('/login', async (req, res) => {

    if (!req.body.email || !req.body.password) {
        res.send({
            message: "please send  email , password in json body"
        });
        return;
    }
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            const isMatched = await bcrypt.varifyHash(req.body.password, user.password);
            if (isMatched) {
                var token =
                    jwt.sign({
                        name: req.body.name,
                        email: req.body.email,
                        role: user.role,
                        id: user._id,
                    }, "123456")

                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });
                return res.json({
                    message: 'signed in successfully',
                    user,
                    token
                })
            } else {
                return res.status(400).json({
                    message: 'Password not matched',
                })
            }
        } else {
            return res.status(404).json({
                message: 'User not found',
            })
        }
    } catch (err) {
        console.log('err', err)
        res.json({
            message: 'server error'
        })
    }
})

module.exports = router;