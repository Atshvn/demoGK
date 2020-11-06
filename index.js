var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();
const port= 9000;
app.listen(port, function(){
    console.log('Server listening on  port' + port);
});

const LinhKienRoute = require('./router/linhkien');
app.use(express.static('public'));
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', LinhKienRoute);
app.locals._ = _;
module.exports = app;