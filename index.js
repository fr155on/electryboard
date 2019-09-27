//jshint esversion:6

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect("mongodb://project:project3@ds023624.mlab.com:23624/heroku_gx9t0hbh" || "mongodb://localhost:27017/electricityDB", { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

const customerSchema = new mongoose.Schema({
  id: Number,
  dbmetid: String,
  dbunit: String,
  dbbill: String,
  dbstatus: String,
  dbdate: String,
});

const Customer = mongoose.model("Customer", customerSchema);

app.get("/update",function(req,res){
  res.sendFile(__dirname+"/update.html");
});

app.post("/update",function(req,res){
  console.log("Meter ID is: " + req.body.meterid);
  console.log("Unit Count is: " + req.body.unitcount);
  console.log("Current Bill is: " + req.body.bill);
  console.log("Status is: " + req.body.onoff);
  console.log("Due Date is: " + req.body.duedate);
  const customer = new Customer({
    id: 1,
    dbmetid: req.body.meterid,
    dbunit: req.body.unitcount,
    dbbill: req.body.bill,
    dbstatus: req.body.onoff,
    dbdate: req.body.duedate,
  });
  Customer.insertMany([customer], function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully saved all the entries.");
    }
  });
  customer.save();
  // var a =JSON.stringify(customer);
  res.send("Values have been saved.");

  // res.redirect("localhost:3000/?metid=" + req.body.meterid + "&unit=" + req.body.unitcount + "&bill=" + req.body.bill + "&status=" + req.body.onoff + "&duedate=" + req.body.duedate);
});

app.get("/fetch", function(req, res) {
  Customer.find(function(err,customer){
    if(err){
      console.log(err);
    }else{

      console.log(customer);
    }
    var a =JSON.stringify(customer);
   res.send(a);
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");

});

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {

});
