var Client = require("pg");
var express = require("express");

var client = new Client();
var app = express();

app.listen(process.env.PORT || 3000, function(){
  console.log("Listening on " + (process.env.PORT));
});

// client.connect()
//
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })
