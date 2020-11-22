var mongoose= require('mongoose');

var productSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    description: String
});

var User = mongoose.model('Product', productSchema, 'products');

module.exports = User;