/* jshint esversion: 6*/

var pg = require("pg");
var express = require("express");
var bodyParser = require('body-parser');

var pool = new pg.Pool();
var app = express();
app.use(bodyParser());

app.get("/table/drop", function(req, res){
  pool.query('DROP TABLE Users', function(err, res){
    console.log(err, res);
  });
});

//SOURCE: https://stackoverflow.com/questions/9875223/auto-increment-table-column
pool.query('CREATE TABLE Users (UserID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, DisplayName varchar(255), UserName varchar(255), LatLong varchar(255))', function(err, res){
  console.log(err, res);
});

// Creates a User
app.post("/user/create", function(req, res){
  pool.query(`INSERT INTO Users (DisplayName,UserName,LatLong) VALUES ('${req.body.displayName}','${req.body.userName}','${req.body.latLong}');`, function(err, res){
    console.log("Created USER");
    console.log(err, res);
  });
});

// Updates a User
app.post("/user/update", function(req, res){

});

// Deletes a User
app.post("/user/delete", function(req, res){

});



app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on " + (process.env.PORT));
});
