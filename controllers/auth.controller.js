var md5=require('md5');

const db = require('../db');

module.exports = {
    login: function(req,res){
        // console.log(name);
        res.render('auth/login')
    },

    postLogin: function(req,res){
        console.log(req.body);
        var email= req.body.email;
        var password= req.body.password;
        var user= db.get('users').find({email:email}).value();
        if (!user){
            res.render('auth/login',{
                values:req.body,
                errors:[
                    'User does not exist!',
                ],
            })
            return;
        }
        var hashedPassword= md5(password);
        if (user.password!= hashedPassword){
            res.render('auth/login',{
                values:req.body,
                errors:[
                    'Wrong password',
                ],
            })
            return;
        }

        res.cookie('userID', user.id, {
            signed: true
        });
        res.redirect('/users');
    }
}