var http = require('http');
const fs = require('fs');
var adr = require('url');
var readline = require('readline');
var mongo = require('mongodb');
var qs = require('querystring');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});

if (req.url == "/"){
    file="final-home.html";
    fs.readFile(file, function(err, txt) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(txt);
        res.end();
    });
} else if (req.url == "/usercreated.html") {
    file="usercreated.html";
    fs.readFile(file, function(err, txt) {
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.write(txt);
        res.end();
    });
} else if (req.url != '/favicon.ico') {
	var dName = "";
	var MongoClient = mongo.MongoClient;
	var qobj = adr.parse(req.url, true).query;
	
	var dName = qobj.name;
	var dServings = qobj.servings;
	var dImg = qobj.image;
	var dLink = qobj.link;
	var dTime = qobj.time;

	//console.log(dName);
	//console.log(dServings);
	//console.log(dImg);
	//console.log(dLink);
	//console.log(dTime);
	

	const url =  "mongodb+srv://dbuser1:dbuser1@cluster0.b9wcq.mongodb.net/?retryWrites=true&w=majority";

  	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    	if(err) { 
		console.log("Connection err: " + err); return; 
	}
	var dbo = db.db("desserts");
	var coll = dbo.collection('usercreated');


	/////////////////////INSERT
	if ((dName != null)&&(dName != null)&&(dName != null)&&(dName != null)&&(dName != null)){
	if (dName != ""){
	var newData = {"name": dName, "servings": dServings, "image": dImg, "link": dLink, "time": dTime};
	coll.insertOne(newData, function(err, res) {
    	if (err) throw err;
    	//console.log("new document inserted");
	});
	}; 
	};
	////////////////////////////DELETE
	var theQuery = { name: null };
	coll.deleteMany(theQuery, function(err, obj) {
	if (err) throw err;
	console.log("document deleted");
	});
		
	////////////////////////////QUERY   	
	theQuery = {};
    	coll.find(theQuery).toArray(function(err, items) {
    	if (err) {
    	console.log("Error: " + err);
    	} 
	else 
    	{
	res.write('<meta name="viewport" content="width=device-width, initial-scale=1" charset="UTF-8">'+'<style>'+
	' body { margin: 0 auto; } #hero { background-image: url("https://raw.githubusercontent.com/alexandra-scott/webmastas/main/final/background.jpg"); background-size: cover; width: 100%; height: 900px; margin-top: -400px; }'+
	'img { width: 125px; height: 125px; border-radius: 50%; margin-top:12px; margin-left:10px; padding-right: 10;}'+
	'#top10 { margin-right: 18%; margin-left: 18%; border-radius: 31px; background-color: #FFFFFF; height: 150px; filter: drop-shadow(0px 14px 15px #1c604e); margin-bottom: 1.5%; position: relative; top: -440px; margin-top: 10px;}'+
	'#wave { background-image: url("https://raw.githubusercontent.com/alexandra-scott/webmastas/main/final/whitewave.png"); margin-top: -139px; background-size:cover; z-index: 10000; height: 150px; width: 100%; background-position: center; }'+	
	'#trend-head { text-align: left; margin-left: 18%; top: 365px; color: #1c604e; filter: drop-shadow(2px 4px 6px #FFFFFF); }' + 
	'h1 { font-family: "Varela Round", sans-serif; text-align: center; font-size: 50pt; color: #FFFFFF; filter: drop-shadow(2px 4px 6px #1c604e); position: relative; top: 445px; margin-bottom: 20px; }'+	
	'#nav a:hover { cursor: pointer; } #nav { text-decoration: none; display: flex; justify-content: flex-start; margin-left: 4%; margin-right: 4%; font-size: 13pt; align-items: center; font-family: "Varela Round", sans-serif; text-align: left; margin-top: 25px; font-size: 16pt; color: #1c604e;}'+
	'header a:active, a:hover, a:visited, a:link { color: #1c604e; text-decoration: none; }'+
	'#namer {font-family: "Varela Round", sans-serif;font-size: 270%; color: #FFFFFF; margin-left:20px; margin-top: 45px; position: relative;float: centerl}'+
	'.column {float: left; padding-right: 0px;}'+
	'p2 {float: right; font-family: "Varela Round", sans-serif; font-size: 20pt; margin-right: 7%; margin-top: 40px;}'+
	'@media (max-width: 1525px) { #namer { font-size: 200%; } }'+
	'@media (max-width: 1525px) { p2 { font-size: 16pt; } }'+
	

	'</style>' + '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Varela+Round|Open+Sans">' 
    + '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">' + 
	
	'<header> <ul id="nav"> <a style="margin-right:4%" href="https://make-desserts.herokuapp.com/">Go Back</a></header>'+
	'<div id="hero" style="margin-top: -300px"><h1 id="trend-head">User-Submitted Recipes</h1></div>' + 
	'<section id="wave"></section>');

    	

////////////////////////////////////////////////////////LOOP//////////////////////////
	for (i=0; i<items.length; i++){
	if (items[i].image == ""){items[i].image = "https://www.nicepng.com/png/full/54-547519_covered-clipart-plate-food-plate-clip-art.png"};

	res.write('<div id = "top10"><div class = "column"><img src='+items[i].image+'></div><div class = column><div id = "namer"><a href='+items[i].link+'" target="_blank">' + 
	items[i].name + '</div></a></br></div><p2><div class = column>Make Time: ' + items[i].time + 
	'</p2></br>Servings: ' + items[i].servings + '</p2></br></br></div></div>');
	
	db.close();
	}
	res.end();
	}
	});

});
}
//}).listen(6060);
}).listen(port);