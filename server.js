/* Module dependencies. */

var bodyParser = require('body-parser');
var express = require('express');
var fileupload = require('express-fileupload');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var handlebars = require('express3-handlebars');
var http = require('http');
var assert = require('assert');
var path = require('path');
var _ = require('lodash');
require('./utils/config/mongo')()



// Route Functions
var index = require('./routes/index');
// var register = require('./routes/register');
var settings = require('./routes/settings');
var support = require('./routes/support');
var paymentinfo = require('./routes/paymentinfo');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const orderRoute = require('./routes/order.route');
const customerRoute = require('./routes/customer.route')
const retailerRoute = require('./routes/retailer.route')

//Customer Routes Functions
var customerHome = require('./routes/customer/home');
var deal = require('./routes/customer/deal');
var orderSummary = require('./routes/customer/order-summary');
var map = require('./routes/customer/map');

//Retailer Routes Functions
var retailerHome = require('./routes/retailer/home');
var retailerOptions = require('./routes/retailer/options');
var retailerInfo = require('./routes/retailer/info');
var retailerVerification = require('./routes/retailer/verification');
var retailerConfirmation = require('./routes/retailer/confirmation');

//JSON OBJECTS
var users = require('./users.json');
var offers = require('./data.json');
const userSchema = require('./utils/schemas/user.schema');

// express variable
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

app.use(session({
    secret: 'foodaid',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 365 * 24 * 60 * 60 * 1000 }
}));
app.use(fileupload());


//Routing
app.use('/',index)
app.use('/customer',customerRoute)
app.use('/retailer',retailerRoute)

// // Routes to see current state of database
// app.get('/users', function(req, res) {
//     res.send(users);
// });
// app.get('/offers', function(req, res) {
//     res.send(offers);
// });

// // Add customer routes
// app.get('/customer/home', function(req, res){
//     res.render('customer/home', offers);
// });

// app.get('/customer/home2', function(req,res){
//   //data['showAlternate']	=	true;
//       res.render('customer/home2', offers);
// });

// app.get('/customer/deal', deal.view);
// app.get('/order-summary', orderSummary.view);
// app.get('/customer/map', map.view);

// //Add retailer routes
// app.get('/retailer/home', retailerHome.view);
// app.post('/retailer/home', createNewOffer);
// app.get('/retailer/options',retailerOptions.view);
// app.post('/retailer/options', addOptionsToOffer);
// app.get('/retailer/verification',retailerVerification.view);
// app.get('/retailer/confirmation', retailerConfirmation.view);
// app.get('/retailer/info', retailerInfo.view);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});



// function createNewOffer(req, res) {
//     if(!checkNewOfferRequest(req)) {
//         console.log('Please fill all required fields');
//         return;
//     }

//     var feature;
//     if(req.body.radio == 'YES') {
//         var offer = _.find(offers.offers, {'feature': true});
//         offer.feature = false;
//         console.log(offer);
//         feature = true;
//     }

//     offers.offers.push({
//         "owner": req.body.owner,
//         "name": req.body.name,
//         "id": offers.offers.length + 1,
//         "wait-time": "35-50 min",
//         "offer": req.body.offer,
//         "price": parseInt(req.body.price),
//         "price-per-unit": "$" + req.body.price + ".00/" + req.body.measure,
//         "quantity": parseInt(req.body.quantity),
//         "img": "http://lorempixel.com/400/200/food",
//         "local-img": "http://lorempixel.com/400/200/food",
//         "feature": feature
//     });

//     res.cookie('offerId', offers.offers.length);
//     res.redirect('/retailer/options');
// }

// function addOptionsToOffer(req, res) {
//     var id = parseInt(req.cookies.offerId);
//     var offer = _.find(offers.offers, {'id': id});

//     if(offer) {
//         if(req.body.radCharity) {
//             offer.donationOrg = req.body.radCharity;
//         } else {
//             offer.donationOrg = null;
//         }

//         if(req.body.radProfit) {
//             offer.profitOrg = req.body.radProfit;
//         } else {
//             offer.profitOrg = null;
//         }
//     }

//     if(offer.profitOrg)
//         res.render('retailer/confirmation', offer);
// }

// function checkNewOfferRequest(req){
//     if(req.body.owner && req.body.name &&
//         req.body.offer && req.body.price &&
//         req.body.measure && req.body.quantity &&
//         req.body.radio) {
//         return true;
//     }
//     return false;
// }

/*var url = 'mongodb://localhost:27017/myproject';

 var insertDocuments = function(db, callback) {
 // Get the documents collection
 var collection = db.collection('documents');
 // Insert some documents
 collection.insertMany([
 {a : 1}, {a : 2}, {a : 3}
 ], function(err, result) {
 assert.equal(err, null);
 assert.equal(3, result.result.n);
 assert.equal(3, result.ops.length);
 console.log("Inserted 3 documents into the collection");
 callback(result);
 });
 };

 var findDocuments = function(db, callback) {
 // Get the documents collection
 var collection = db.collection('documents');
 // Find some documents
 collection.find({}).toArray(function(err, docs) {
 assert.equal(err, null);
 console.log("Found the following records");
 console.log(docs);
 callback(docs);
 });
 };

 // Use connect method to connect to the server
 MongoClient.connect(url, function(err, db) {
 assert.equal(null, err);
 console.log("Connected successfully to server");

 insertDocuments(db, function() {
 findDocuments(db, function () {
 db.close();
 });
 });
 });*/

