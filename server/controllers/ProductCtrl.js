var Products = require('../model/rentalModel');


module.exports = {

    create: function (req, res) {
        Products.create(req.body, function (err, result) {
            console.log(err, result);
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.json(result);
            }
        });
    },

    read: function (req, res) {
        Products.find().exec(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.json(result);
            }
        });
    },

    remove: function (req, res) {
        console.log(req.params.id);
        Products.findByIdAndRemove(req.params.id, function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                Products.find().exec(function (err, result) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    else {
                        res.json(result);
                    }
                });
            }
        });

    }
    
};

