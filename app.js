//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const date = require(__dirname + "/date.js");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

/////////////mongoose connected//////////////////
// mongoose.connect('mongodb://localhost:27017/todolistsDB', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://Arpan:root@cluster0.c5dp1.mongodb.net/todolistsDB', {useNewUrlParser: true, useUnifiedTopology: true});


// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];

////////////schema

const itemsSchema = new mongoose.Schema({
	name : String,
});

////////mongoose model
const Item =mongoose.model("Item" , itemsSchema);


/////////new items by default
const item1= new Item({
  name:"This is your list"
});
const item2= new Item({
  name:"Hit the + button to insert"
});
const item3= new Item({
	name:"<--- Hit this to delete"
});

const defaultItems=[item1,item2,item3];




app.get("/", function(req, res) {

Item.find({},function(err,foundItems){
	// console.log(foundItems);

	if(foundItems.length === 0){
		Item.insertMany(defaultItems , function(err){
			if (err) {
				console.log(err);
			}
			else {
				console.log("Successfull");
				// console.log(defaultItems[2]);
				res.redirect("/");
			}

		});
		}
		else {
				res.render("list", {listTitle: "Today", newListItems: foundItems});
		}



});


	// const day = date.getDate();


});

app.post("/", function(req, res){
	//inserting a item generated by the user;

  const newItem = req.body.newItem;
	const item =new Item({
		name :newItem
	});
	item.save();
	res.redirect("/");



});

app.post("/delete",function(req,res){
	const checkedItem=req.body.check;
	// console.log(checkedItem);

	Item.findByIdAndRemove({_id:checkedItem},function(err){
		if (err) {
			console.log(err);

		}
		else{
			console.log("SUCCESS");
		}
	});

	res.redirect("/");
});



app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
