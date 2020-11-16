var db = require('../db');

module.exports= {
    requireAuth: function(req,res,next){
        // res.locals.user=null;
        // console.log(req.signedCookies.userID);
        
        if (!req.signedCookies.userID){
            // console.log(res.locals);
            // console.log('..');
            res.redirect('/auth/login');
            // console.log(1);
            return;
        }

        var user= db.get('users').find({id: req.signedCookies.userID}).value();

        if (!user){
            // console.log(2);
            res.redirect('/auth/login');
            return;
        }
         
        res.locals.user= user;
        next();
    }
}