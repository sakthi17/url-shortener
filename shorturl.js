var express = require('express');
var app = express();
var MongoClient = require('mongodb').MongoClient; 
var validUrl = require('valid-url');
var shortid = require('shortid');


app.get('/new/:longurl(*)',function(req,res){
  var longUrl = req.params.longurl;
   
  if (validUrl.isUri(longUrl) ){    
    MongoClient.connect(process.env.MLAB_MONGODB_URI,function(err,client){      
      if(err) throw err;
      console.log("Connected to mongoDB server");     
      var db = client.db(process.env.MLAB_DB_NAME);
      var collection = db.collection('urlCollection');
    
      collection
        .find({longurl: longUrl})
        .toArray(function(err,docs)
        {
          if(err) throw err;    
          var doc = {longurl: "" , shorturl: ""};  
          if( docs.length > 0){
            console.log("Found duplicate input URL");
            doc = docs[0];
            client.close();
          }
          else {
            var newid = shortid.generate();
            doc.longurl = longUrl ;
            doc.shorturl= "https://" + req.hostname + "/" + newid;
            collection.insertOne(doc ,function(err,result){
              if(err) throw err 
              console.log("One new doc Inserted into DB" + JSON.stringify(result.ops));
              client.close();
            });
          }                   
          res.send({original_url: doc.longurl, short_url: doc.shorturl});  
        });     
    });      
  } 
  else {
   console.log(longUrl + ' Not a URI');
   res.send(longUrl + ' Invalid URL');
  }
  
});

app.get('/:shortid',function(req,res){
  var shortid = req.params.shortid;   
  MongoClient.connect(process.env.MLAB_MONGODB_URI , function(err,client){ 
    if(err) throw err;
    console.log("Connected to mongoDB server");        
    var db = client.db(process.env.MLAB_DB_NAME);
    var collection = db.collection("urlCollection");  
    collection
      .find({shorturl: "https://" + req.hostname + "/" + shortid})
      .toArray(function(err,docs){
        if(err) throw err;      
        if(docs.length === 0)
          res.send("Check again..There is no such short-URL id");  
        else
          res.redirect(docs[0]["longurl"]);
    });
    client.close();
  });
  
});


module.exports = app;