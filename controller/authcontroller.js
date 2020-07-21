const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const register =(req,res,next) => { 
    bcrypt.hash(req.body.password,10,function(err,hashedpass){
        if(err){
            res.json({
                error:err
            })
        }
        let user = new User({
            name : req.body.name,
            email : req.body.email,
            phone : req.body.phone,
            password : hashedpass
        })
        user.save()
        .then(user=>{
            res.json({
                message:'user added successfully'
            })
        })
        .catch(error=>{
            res.json({
                message:'an error occured'
            })
        })
    })
  
}

module.exports={
    register
}