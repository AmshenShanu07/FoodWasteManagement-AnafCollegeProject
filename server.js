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
const customerRoute = require('./routes/customer.route');
const retailerRoute = require('./routes/retailer.route');
const adminRoute = require('./routes/admin.route');



// express variable
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({limit:'10000000kb'}));
app.use(bodyParser.urlencoded({ extended: false,limit:'10000000000kb' }));
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
app.use('/',index);
app.use('/customer',customerRoute);
app.use('/retailer',retailerRoute);
app.use('/admin',adminRoute);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

