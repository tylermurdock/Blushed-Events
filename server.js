var bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    aws = require('aws-sdk'),
    app = express(),
    port = process.env.PORT || 8787,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    // GoogleKeys            = require('./server/keys'),
    
    // FacebookStrategy= require('passport-facebook').Strategy,
    
    
    ////////CONTROLLERS/////////
    
    User = require('./server/model/userModel'),
    AuthCtrl = require('./server/controllers/AuthCtrl'),
    ProductCtrl = require('./server/controllers/ProductCtrl'),
    CartCtrl = require('./server/controllers/CartCtrl'),
    OrderCtrl = require('./server/controllers/OrderCtrl');
    



    /////////MIDDLE WARE////////

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(__dirname + '/public'));





//////// AUTH //////////////
app.use(session({
    secret: 'secretTime',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.googleId,
    clientSecret: process.env.googleSecret,
    callbackURL: "/auth/google/callback"
},
    function (accessToken, refreshToken, profile, done) {
        var query = { 'google.id': profile.id };

           User.findOne(query, function (error, user) {

               if (user) {
                   console.log('Google user found in database: ', user);
                   done(null, user);
               }
               else {
                   console.log('Google user not found in database');
                   user = new User;
                   user.email = profile.emails[0].value;
                   user.image = profile._json.image.url;
                   user.displayName = profile.displayName;

                   user.google = {};
                   user.google.id = profile.id;
                   user.google.token = accessToken;

                   console.log('new user created: ', user);

                   user.save();
                   done(null, user);
               }
           });
    }
));


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

passport.serializeUser(function (user, done) {
    done(null, user);
});

// var requireAuth = function(req, res, next){
//   if(req.isAuthenticated()){
//     return next();
//     }
//     return res.redirect('/auth/facebook')
// }

passport.deserializeUser(function (user, done) {
    done(null, user);
});

// app.get('/me', requireAuth, function(req, res){
//   var currentLoggedInUserOnSession = req.user;

//   res.send(currentLoggedInUserOnSession);
// })

app.get('/auth/google', passport.authenticate('google', {
    session: true,
    scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/#/admin',
    failure: '/'
}));

app.get('/auth/user', function (req, res) {
    if (req.user) res.send(req.user);
    else res.send({ "not": "signed in"});
});




///////////// ENDPOINTS ////////////////
/////////////////////////////////
/////////////////////////////////



///RENTALS///
// app.post('/rentals', ProductCtrl.create);
// app.get('/rentals', ProductCtrl.read);

///CART///
function isCart(req, res, next) {
    if (!req.session.cart) {
        req.session.cart = [];
        next();
    }
    next();
}
app.post('/cart', isCart, CartCtrl.create);
app.get('/cart', isCart, CartCtrl.get);
app.put('/cart/remove', isCart, CartCtrl.remove);
app.put('/cart/update', isCart, CartCtrl.update);


//// ADMIN AND PRODUCTS/////


// var ProductsSchema = new mongoose.Schema({
//   name: {type: String, required: true},
//   description: {type: String},
//   price: {type: Number, required: true},
//   category: {type: String, required: true},
//   theme: {type: String},
//   color: {type: String}
// });

// var Product = mongoose.model('Product', ProductsSchema);


app.post('/api/products', ProductCtrl.create);

app.get('/api/products', ProductCtrl.read);

app.delete('/api/products/remove/:id', ProductCtrl.remove);


///////////// ORDERS /////////////////

app.post('/api/orders', OrderCtrl.create);
app.get('/api/orders', OrderCtrl.read);


//////////// CONNECTIONS ////////////


var mongoURI = 'mongodb://tylermurdock:hustle21@ds045465.mongolab.com:45465/blushed-events';
mongoose.set('debug', true);
mongoose.connect(mongoURI);
mongoose.connection.once('open', function () {
    console.log('mdb listening on:', mongoURI);
});


app.listen(port, function () {
    console.log("listening on port" + port);
});
