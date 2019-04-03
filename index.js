/*
  Project 1
  Simple REST API to create users and addresses
*/

var pg = require("pg");
var express = require("express");
var bodyParser = require('body-parser');
var NodeGeocoder = require("node-geocoder");

var geocoder = NodeGeocoder({
  provider: 'google',
  apiKey: process.env.GOOGLE_API,
});

var client = new pg.Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    }),
    app = express();

client.connect();

app.use(bodyParser());

// ** Create Tables **

client.query('CREATE TABLE IF NOT EXISTS Users (UserID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, DisplayName varchar(255), UserName varchar(255), Lat float(5), Long float(5))', function(err, result){ //Users Table
  if(!err) console.log("Successfully created Users table");
  else console.log(err);
});

client.query('CREATE TABLE IF NOT EXISTS Addresses (AddressID int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, AddressTitle varchar(255),Address varchar(255), Lat float(5), Long float(5), UserID int)', function(err, result){ //Addresses Table
  if(!err) console.log("Successfully created Addresses table");
});

console.log("we're still good");

// ** CRUD Addresses **

// Create address
app.post("/address/create", function(req, res){
  console.log(req);
  geocoder.geocode(req.body.address, function(err, res) {
    client.query(`INSERT INTO Addresses (AddressTitle,Address,Lat,Long,UserID) VALUES ('${req.body.addressTitle}','${req.body.address}',${res[0].latitude},${res[0].longitude},${req.body.userID});`, function(err, result){
      console.log("Created Address");
      res.sendStatus(200);
    });
  });
});

//Update address
app.post("/address/update", function(req, res){
  geocoder.geocode(req.body.address, function(err, res) {
    client.query(
      `UPDATE Addresses
      SET AddressTitle = '${req.body.addressTitle}', Address = '${req.body.address}', Lat = ${res[0].latitude}, Long = ${res[0].longitude}
      WHERE AddressID = '${req.body.addressID}';`, function(err, result){
      console.log("Updated Address");
      res.sendStatus(200);
    });
  });
});

//Delete address
app.post("/address/delete", function(req, res){
  client.query(`DELETE FROM Addresses WHERE AddressID=${req.body.addressID}`, function(err, result){
    console.log("Deleted Address");
    res.sendStatus(200);
  });
});

// Returns a JSON list of all the user’s locations.
app.get("/:username/poi", function(req, res){
  client.query(`SELECT AddressTitle,Address,Address.Lat,Address.Long FROM Users JOIN Addresses ON Users.UserID=Addresses.UserID WHERE Users.UserName='${req.params.username}'`, function(err, result){
    res.json(result.rows);
  });
});

// Returns a JSON list of all addresses
app.get("/addresses", function(req, res){
  client.query("SELECT * FROM Addresses", function(err, result){
    res.json(result.rows);
  });
});

// ** CRUD Users **

// Creates a User
app.post("/user/create", function(req, res){
  client.query(`INSERT INTO Users (DisplayName,UserName,Lat,Long) VALUES ('${req.body.displayName}','${req.body.userName}',${req.body.lat},${req.body.long});`, function(err, result){
    console.log("Created USER");
    res.sendStatus(200);
  });
});

// Updates a User
app.post("/user/update", function(req, res){
  client.query(
    `UPDATE Users
    SET DisplayName = '${req.body.displayName}', UserName = '${req.body.userName}', Lat = ${req.body.lat}, Long = ${req.body.long}
    WHERE UserID = '${req.body.userID}';`, function(err, result){
    console.log("Updated USER");
    res.sendStatus(200);
  });
});

// Deletes a User
app.post("/user/delete", function(req, res){
  client.query(
    `DELETE FROM Users
    WHERE UserID = '${req.body.userID}';`, function(err, result){
    console.log("Deleted USER");
    res.sendStatus(200);
  });
});

// Gets a User
app.get("/user/:username", function(req, res){
  client.query(`SELECT * FROM Users WHERE Users.UserName='${req.params.username}'`, function(err, result){
    res.json(result.rows); // Return result of SQL query
  });
});

// Gets all Users
app.get("/users", function(req, res){
  client.query("SELECT * FROM Users", function(err, result){
    res.json(result.rows); // Return result of SQL query
  });
});

// Home Page
app.get("/", function(req, res){
  res.send("Everything is good");
});

// ** Start Server **

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on " + (process.env.PORT || 3000));
});
