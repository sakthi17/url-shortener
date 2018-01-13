var express = require('express');
var app = express();
var shorturl = require('./shorturl.js');

//serve static files
app.use(express.static('public'));

// serve main page 
app.get('/',function(req,res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/*',shorturl);

var listener = app.listen(process.env.PORT, function(){
  console.log('URL-shortener API is listening on port ' + listener.address().port);
});