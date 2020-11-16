const db = require('../db');
const shortid = require('shortid');
var countLogin=0;

module.exports = {
    index: function (req, res) {
        // console.log(count);
        // console.log(res.locals.user);
        var success= countLogin==0 ? 1 : 0;
        res.render('users/index.pug', {
            success: success,
            users: db.get('users').value(), // transfer value into html files
        });
        countLogin+=1;
    },

    search: function (req, res) {
        var q = req.query.q;
        var matchedUsers = db.get('users').filter(function (user) {
            return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
        }).write();
        //console.log(matchedUsers);
        res.render('users/search.pug', {
            users: matchedUsers,
        });
    },

    create: function (req, res) {
        // console.log(req.cookies);
        // res.locals.trials=0;
        res.render('users/create', {
            users: db.get('users').value(),
        });
    },

    viewUser: function (req, res) {
        var id = req.params.id;
        var user = db.get('users').find({
            id: id
        }).value();
        res.render('users/viewuser', {
            user: user,
        });
    },

    postCreate: function (req, res) {
        req.body.id = shortid.generate();
        // console.log(res.locals); 

        db.get('users').push(req.body).write();
        res.redirect('/users');
    },

}