var Orders = require('../model/ordersModel');


module.exports = {

    create: function (req, res) {
        Orders.create(req.body, function (err, result) {
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
        Orders.find().exec(function (err, result) {
            if (err) {
                return res.status(500).send(err);
            }
            else {
                res.json(result);
            }
        });
    }
    
};
	
