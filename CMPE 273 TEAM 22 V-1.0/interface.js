var express= require('express'),
	app = express();
	cons = require('consolidate'),
	bodyParser = require('body-parser'),
	unirest = require('unirest'),
	repository = require('./repository');


    app.use(bodyParser.json()); // used to parse JSON object given in the request body

	//MongoClient = require('mongodb').MongoClient,
	//Server = require('mongodb').Server;

//app.engine('html',cons.swig);
//app.set('view engine','html');
//app.set('views',__dirname+"/views");

//var mongoClient = new MongoClient(new Server("localhost",27017,
//											{'native_parser':true}));

//var db = mongoClient.db('test');

app.post("/addnode",function(req,res){
	/*db.collection('customer').findOne({name:"JvalantMongo"},function(err,doc){

		res.render("hello",doc);
	});	*/
	
    console.log(req.is('json'));
	var address =  req.body;
	console.log("address from request -");
	//repository.addresses.push(address);
	//console.log("addresses in repo --");
	//console.log(repository.addresses);
	console.log(JSON.stringify(req.body))

	unirest.post('http://localhost:8004/addnode')
    .headers('Content-type: application/json')
    .send(JSON.stringify(req.body))
    .end(function (response) {

    	 if (response.statusCode == 200) {
        					console.log(response.body);
        					
        					res.status(200).send(response.body);
    				 }
     
     });

	/*request.post({url:'http://localhost:8004/addnode',formData:JSON.stringify(req.body)},
				 function(err,response,body){

				  if (!err && response.statusCode == 200) {
        					console.log(body) // Print the google web page.
        					
        					res.status(200).send(body);
    				 }

				});
		*/
});

app.get("*",function(req,res){
	res.status(400).send("Page not found");
});

app.listen(8003);

/*mongoClient.open(function(err,mongoClient){
	if(err) throw err;
	app.listen(8000);
	console.log("Express server started on port 8000");
})*/
