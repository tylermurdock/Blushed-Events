var bodyParser  = require('body-parser'),
    cors        = require('cors'),
    mongoose    = require('mongoose'),
    express     = require('express'),
    app         = express(),
    session     = require('express-session'),
    Products    = require('./server/controllers/ProductCtrl'),
    CartCtrl    = require('./server/controllers/CartCtrl'),
    aws         = require('aws-sdk'),
    port        = 8787;


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'this is a really great secret',
  resave: false,
  saveUninitialized: true
}));


///RENTALS///
app.post('/rentals', Products.create);
app.get('/rentals', Products.read);

///CART///
function isCart(req, res, next) {
  if(!req.session.cart) {
    req.session.cart = [];
    next();
  }
  next();
}
app.post('/cart', isCart, CartCtrl.create);
app.get('/cart', isCart, CartCtrl.get);
app.put('/cart/remove', isCart, CartCtrl.remove);
app.put('/cart/update', isCart, CartCtrl.update);

// app.post('/api/setCookie', function(req, res){
//   req.session.cart = req.body;
//   res.end();
// });
// app.get('/api/getCookie', function(req, res){
//   console.log(req.session);
//   res.json(req.session.cart);
// });

var mongoURI  = 'mongodb://localhost:27017/blushed';
mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function(){
  console.log('mdb listening on:', mongoURI);
});


app.listen(port, function(){
  console.log("listening on port" + port);
});
