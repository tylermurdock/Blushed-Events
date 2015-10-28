module.exports = {

  create: function(req, res) {
    req.session.cart.push(req.body);
    res.send(req.session.cart);
  },

  get: function(req, res) {
    res.send(req.session.cart);
  },

  remove: function(req, res) {
    for(var i = 0; i < req.session.cart.length; i++){
        if(req.session.cart[i]._id === req.body._id)
        req.session.cart.splice(i, 1);
        res.send(req.session.cart);
    }
  },

  update: function(req, res){
    for (var i = 0; i < req.session.cart.length; i++){
      if(req.session.cart[i]._id === req.body._id){
      req.session.cart[i] = (req.body);
      }
    }
    console.log(req.session.cart);
      res.send(req.session.cart);
  }
};
