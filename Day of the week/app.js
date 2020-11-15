//jshint esversion:6

const express=require('express');
const bodyParser=require('body-parser');
const ejs=require('ejs');
const app=express();

app.set('view engine', 'ejs');


app.get("/",function(req,res){
  const day=["sunday","monday","tuesday","thrusday","friday","saturday"];
  var today =new Date();
  var currentDay =today.getDay();

res.render('list',{dayOfTheWeek:day[currentDay]});





});




app.listen(3000, function(){
  console.log("Server started on port 3000");
});
