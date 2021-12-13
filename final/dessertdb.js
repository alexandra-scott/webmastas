var http = require('http');
const fs = require('fs');
var adr = require('url');
var readline = require('readline');
var mongo = require('mongodb');
var qs = require('querystring');
var port = process.env.PORT || 3000;
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
if (req.url != '/favicon.ico') {
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
	var newData = {"name": dName, "servings": dServings, "image": dImg, "link": dLink, "time": dTime};
	//coll.insertOne(newData, function(err, res) {
    	if (err) throw err;
    	//console.log("new document inserted");
	//}); 

	////////////////////////////QUERY   	
	theQuery = {};
    	coll.find(theQuery).toArray(function(err, items) {
    	if (err) {
    	console.log("Error: " + err);
    	} 
	else 
    	{
	res.write('<style> body { margin: 0 auto; } #hero { background-image: url("https://raw.githubusercontent.com/alexandra-scott/webmastas/main/final/background.jpg"); background-size: cover; width: 100%; height: 900px; margin-top: -400px; }'+
	'img { width: 125px; height: 125px; border-radius: 50%; margin-top:12px; margin-left:10px; margin-right: 0;}'+
	'#top10 { margin-right: 18%; margin-left: 18%; border-radius: 31px; background-color: #FFFFFF; height: 150px; filter: drop-shadow(0px 14px 15px #1c604e); margin-bottom: 1.5%; position: relative; top: -440px; margin-top: 10px;}'+
	'#wave { background-image: url("https://raw.githubusercontent.com/alexandra-scott/webmastas/main/final/whitewave.png"); margin-top: -139px; background-size:cover; z-index: 10000; height: 150px; width: 100%; background-position: center; }'+	
	'#trend-head { text-align: left; margin-left: 18%; top: 365px; color: #1c604e; filter: drop-shadow(2px 4px 6px #FFFFFF); }' + 
	'h1 { font-family: "Varela Round", sans-serif; text-align: center; font-size: 50pt; color: #FFFFFF; filter: drop-shadow(2px 4px 6px #1c604e); position: relative; top: 445px; margin-bottom: 20px; }'+	
	'#nav a:hover { cursor: pointer; } #nav { text-decoration: none; display: flex; justify-content: flex-start; margin-left: 4%; margin-right: 4%; font-size: 13pt; align-items: center; font-family: "Varela Round", sans-serif; text-align: left; margin-top: 25px; font-size: 16pt; color: #1c604e;}'+
	'header a:active, a:hover, a:visited, a:link { color: #1c604e; text-decoration: none; }'+
	'#namer {font-family: "Varela Round", sans-serif;font-size: 250%; color: #FFFFFF; margin-left:12%; position: relative;}'+
	'.column {float: left; padding-right: 0px;}'+
	'p2, p3 {font-family: "Varela Round", sans-serif; margin-left: 12%; font-size: 16pt; padding-right: 10px;}'+
	

	'</style>' + 
	
	'<header> <ul id="nav"> <a style="margin-right:4%" href="https://alexandra-scott.github.io/webmastas/final/final-home.html">Go Back</a></header>'+
	'<div id="hero" style="margin-top: -300px"><h1 id="trend-head">User-Made Recipes</h1></div>' + 
	'<section id="wave"></section>');

    	

////////////////////////////////////////////////////////LOOP//////////////////////////
	for (i=0; i<items.length; i++){
	if (items[i].image == ""){items[i].image = "https://www.nicepng.com/png/full/54-547519_covered-clipart-plate-food-plate-clip-art.png"};

	res.write('<div id = "top10"><div class = "column"><img src='+items[i].image+'></div><div class = column><div id = "namer"><a href='+items[i].link+'>' + 
	items[i].name + '</div></a></br><p2></div><div class = column>Make Time: ' + items[i].time + 
	'</p2></br><p3>Servings: ' + items[i].servings + '</p3></br></br></div></div>');
	


	db.close();
	}
	res.end();
	}
	});

});
}
}).listen(port);


