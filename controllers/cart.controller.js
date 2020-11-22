const db = require('../db');

module.exports = {
    addToCart: function (req, res) {
        var productID = req.params.productID;
        var sessionID = req.signedCookies.sessionID;

        if (!sessionID) {
            res.redirect("/products");
            return;
        }
        var count = db.get('sessions').find({
            id: sessionID
        }).get('cart.' + productID, 0).value();
        db
            .get('sessions')
            .find({
                id: sessionID
            })
            .set('cart.' + productID, count + 1)
            .write();
        res.redirect("/products");
    },

    viewCart: function (req, res) {
        var sessionID = req.signedCookies.sessionID;
        var products= db.get('products').filter(function(product){
            return (db.get('sessions').find({
                id: sessionID
            }).value().cart[product.id])>0       }).write()
        // var result=[];
        // var temp=db.get('sessions').find({
        //     id: sessionID
        // }).value();
    
        // console.log(temp.cart['f1514167-c016-4a19-892b-1dfda4938265']);

        for (var i=0;i<products.length;i++){
            products[i].quantity=db.get('sessions').find({
                id: sessionID
            }).value().cart[products[i].id];
        }
        // console.log(products);
        // var matchedUsers = db.get('users').filter(function (user) {
        //     return user.name.toLowerCase().indexOf(q.toLowerCase()) != -1;
        // }).write()
        var page = parseInt(req.query.page) || 1; // n
        var perPage = 8; // x

        var start = (page - 1) * perPage;
        var end = page * perPage;

        var drop = (page - 1) * perPage;

        res.render('cart/view', {
            //products: db.get('products').value().slice(start, end)
            products: products.slice(start, end)
        });
    }



}