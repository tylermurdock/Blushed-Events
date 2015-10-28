var mongoose = require('mongoose');

var ProductsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  theme: {type: String},
  color: {type: String}
});


module.exports = mongoose.model('Products', ProductsSchema);
