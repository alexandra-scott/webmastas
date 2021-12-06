var http = require('http');
var mongo = require('mongodb');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
if (req.url != '/favicon.ico') {
    var dessertName = "Cake Balls";
	var MongoClient = mongo.MongoClient;


	const url =  "mongodb+srv://dbuser1:dbuser1@cluster0.b9wcq.mongodb.net/?retryWrites=true&w=majority";

  	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    	if(err) { 
		console.log("Connection err: " + err); return; 
	}
  
    	var dbo = db.db("desserts");
	var coll = dbo.collection('desserts_likes');
////////////////////////////QUERY   	
	theQuery = {name:dessertName};
    	coll.find(theQuery).toArray(function(err, items) {
    	if (err) {
    	console.log("Error: " + err);
    	} 
	else 
    	{
    	console.log("Items: ");
    	for (i=0; i<items.length; i++){
   	console.log(i + ": " + items[i].name + " Likes: " + items[i].likes + "IMg: " + items[i].picture);
	var compName = items[i].name;   	
	var compLikes = items[i].likes;
	compLikes = compLikes + 1;
	var compPicture = items[i].picture;
	}
	}


/////////////////////INSERT
	var newData = {"name": compName, "picture": compPicture, "likes": compLikes};
	coll.insertOne(newData, function(err, res) {
    	if (err) throw err;
    	console.log("new document inserted");
	});   
	
//////////////////////////DELETE
    	var theQuery = { name: dessertName };
  	coll.deleteOne(theQuery, function(err, obj) {
    	if (err) throw err;
    	console.log("document deleted");
    	});

	
	});
});



res.write('It worked');
}
res.end();
}).listen(6060);