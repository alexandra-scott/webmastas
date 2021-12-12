var http = require('http');
const fs = require('fs');
var adr = require('url');
var readline = require('readline');
var mongo = require('mongodb');
var qs = require('querystring');
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
	coll.insertOne(newData, function(err, res) {
    	if (err) throw err;
    	console.log("new document inserted");
	}); 

	////////////////////////////QUERY   	
	theQuery = {};
    	coll.find(theQuery).toArray(function(err, items) {
    	if (err) {
    	console.log("Error: " + err);
    	} 
	else 
    	{
    	for (i=0; i<items.length; i++){
	res.write('<img src='+items[i].image+' style= "max-width: 200px;"></br><a href='+items[i].link+'>' + items[i].name + '</a></br><p2>Make Time: ' + items[i].time + 
		'</p2></br><p3>Servings: ' + items[i].servings + '</p3></br></br>');
	db.close();
	}
	res.end();
	}
	});

});
}
}).listen(6060);




	//res.write(
	//'<div>' +
	//obj1.name +
	//obj1.servings +
	//obj1.time +
	//obj1.link +
	//'</div>'
	//);