var http = require('http'),
httpProxy = require('http-proxy'),
express= require('express'),
	app = express();
	cons = require('consolidate'),
	bodyParser = require('body-parser'),
	repository = require('./repository');


    app.use(bodyParser.json()); 

//
// A simple round-robin load balancing strategy.
//
// First, list the servers you want to use in your rotation.
//
var addresses = [
{
host: 'localhost',
port: 8000
},
{
host: 'localhost',
port: 8001
}
];

app.post("/addnode",function(req,res){
	
	console.log("address from interface -");
	console.log(JSON.stringify(req.body));
	var address =  req.body;
	
	repository.addresses.push(address);
	console.log("addresses in repo --");
	console.log(repository.addresses);
	res.status(200).send("Added..");
	
});

app.post("/deletenode",function(req,res){
	
	console.log("address from interface -");
	console.log(JSON.stringify(req.body));
	var address =  req.body;
	delete repository.addresses[repository.addresses.indexOf(address)]
	//repository.addresses.push(address);
	console.log("addresses in repo --");
	console.log(repository.addresses);
	res.status(200).send("Deleted..");
	
});
         
app.listen(8004);

var proxy = httpProxy.createServer();
http.createServer(function (req, res) {
//
// On each request, get the first location from the list...
//
console.log(repository.addresses);
var target = { target: repository.addresses.shift() };
//
// ...then proxy to the server whose 'turn' it is...
//
console.log('balancing request to: ', target);
proxy.web(req, res, target);
//
// ...and then the server you just used becomes the last item in the list.
//

repository.addresses.push(target.target);
}).listen(8021);
// Rinse; repeat; enjoy.

http.createServer(function (req, res) {
	console.log("request served by localhost:8000")
	res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request served by localhost:8000'+ '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(8000);

http.createServer(function (req, res) {
    console.log("request served by localhost:8001")
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request served by localhost:8001'+ '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
}).listen(8001);