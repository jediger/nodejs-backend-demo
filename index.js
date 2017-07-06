var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.use('/v1', require('./v1'));
app.use('/v2', require('./v2'));
app.get('/', function(req, res) {
  res.json(['v1', 'v2']);
});

app.listen(8081);
