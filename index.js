var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');
var config = require('./config');

app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/v1', require('./v1'));
app.use('/v2', require('./v2'));
app.get('/', function(req, res) {
	res.json(['v1', 'v2']);
});

app.listen(8081);
