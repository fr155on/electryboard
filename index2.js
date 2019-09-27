//jshint esversion:6

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/electricityDB", { useNewUrlParser: true });

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

// const customerSchema = new mongoose.Schema({
//   dblat: Number,
//   dblng: Number,
// });
//
// const Position = mongoose.model("Position", positionSchema);

app.get("/", function(req, res) {
  
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
  console.log("Meter ID is: "+req.body.meterid);
  console.log("Unit Count is: "+req.body.unitcount);
  console.log("Current Bill is: "+req.body.bill);
  console.log("Status is: "+req.body.onoff);
  console.log("Due Date is: "+req.body.duedate);
  let url = "localhost:3000/?metid="+req.body.meterid+"&unit="+req.body.unit+"&bill="+req.body.bill+"&status="+req.body.status+"&duedate="+req.body.duedate;
  res.redirect(url);
});
app.listen(3000, function() {
  console.log("Server started on port 3000");
});


//     ?metid=123&unit=234&bill=5000&status=OFF
