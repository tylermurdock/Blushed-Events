var mongoose = require('mongoose');
var Products = require('../model/rentalModel');


var OrdersSchema = new mongoose.Schema({
    pickUpDate: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true, min: 7, max: 10},
    notes: { type: String },
    rentals: [
        {
            id:{type: mongoose.Schema.Types.ObjectId, ref: 'Products'},
            name: {type: String, required: true},
            qty: {type: Number, required: true},
            price: {type: Number, required: true},
            img: {type: String}
        }
    ]

});


module.exports = mongoose.model('Orders', OrdersSchema);