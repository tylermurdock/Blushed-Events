var bodyParser      = require('body-parser'),
    cors            = require('cors'),
    mongoose        = require('mongoose'),
    express         = require('express'),
    session         = require('express-session'),
    // passport        = require('passport'),
    // FacebookStrategy= require('passport-facebook').Strategy,
    Products        = require('./server/controllers/ProductCtrl'),
    CartCtrl        = require('./server/controllers/CartCtrl'),
    aws             = require('aws-sdk'),
    // keys            = require('./server/keys'),
    app             = express(),
    
    port            = 3000;


app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'secretTime',
  resave: false,
  saveUninitialized: true,
}));


// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(new FacebookStrategy({
//   clientID: '',
//   clientSecret: '',
//   callbackURL: 'http://localhost:3000/auth/facebook/callback',  
// }), function (token, refreshToken,profile, done) {
//   return done(null, 
//   {
//       token: token,
//       profile: profile
//      });
// });


// app.get('/auth/facebook', passport.authenticate('facebook'));

// app.get('/auth/facebook/callback', passport.authenticate('facebook', {
//   successRedirect: '/me',
//   failureRedirect: '/login'
// }), function(req, res) {
//     console.log(req.session);
// });

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// var requireAuth = function(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//     }
//     return res.redirect('/auth/facebook')
// }

// passport.deserializeUser(function(obj, done) {
//   done(null, obj);
// });

// app.get('/me', requireAuth, function(req, res){
//   var currentLoggedInUserOnSession = req.user;
  
//   res.send(currentLoggedInUserOnSession);
// })







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
