const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { validateBody, schemas } = require('../config/validation');
const JWT = require('jsonwebtoken');

const users = mongoose.model('users')

signToken = user => {
    return JWT.sign({
        iss:'Money Manager',
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email:user.email,
        iat:new Date().getTime(),
        exp: new Date().setDate(new Date().getDate()+1)
    },'qwertyuiop')
}

router.post('/signup', validateBody(schemas.signUpSchema), async(req, res, next) => {
    const foundUser = await users.findOne({email: req.value.body.email});
    if(foundUser){   
        return res.status(400).json({
            "message":"Email already in use"
        })
    }else{
        const newUser = new users ({
            firstName: req.value.body.firstName,
            lastName: req.value.body.lastName,
            email: req.value.body.email,
            password: req.value.body.password
        })
        await newUser.save();
        // const tokenData = new users ({
        //     firstName: req.value.body.firstName,
        //     lastName: req.value.body.lastName,
        //     email: req.value.body.email,
        // })
        // const token = signToken(tokenData);
        res.status(200).json({
            message: 'created account'
        })
    }
})

router.post('/login', validateBody(schemas.loginSchema), async (req, res, next) => {
    const foundUser = await users.findOne({
        email: req.value.body.email,
        password: req.value.body.password
    });

    if(!foundUser){
        return res.status(401).json({
            message: "Email-ID or Password not found"
        }) 
    }else{
        const token = signToken(foundUser);
        res.status(200).json({
            token: token
        })
    }
})
module.exports = router;