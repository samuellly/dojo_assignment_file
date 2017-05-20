var http = require('http');
var fs = require('fs');
var filePath = require('path');

var server = http.createServer(function (request, response){

	console.log('client request URL: ', request.url);

	if(request.url === '/cars') {
		fs.readFile('views/cars.html', 'utf8', function (errors, contents){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents); 
			response.end();
		});
	} else if (request.url === '/cats') {
		 fs.readFile('views/cats.html', 'utf8', function (errors, contents){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents);
			response.end();
		});
	} else if(request.url === '/cars/new') {
		fs.readFile('views/newCar.html', 'utf8', function (errors, contents){
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write(contents); 
			response.end();
		});
	} else if(request.url === '/stylesheets/style.css') {
		fs.readFile('stylesheets/style.css', 'utf8', function (errors, contents){
			response.writeHead(200, {'Content-Type': 'text/css'});
			response.write(contents); 
			response.end();
		});
	} 
	else if(filePath.extname(request.url) === '.jpg') {
		fs.readFile('images/' + filePath.basename(request.url), function (errors, contents){
			response.writeHead(200, {'Content-Type': 'image/jpg'});
			response.write(contents); 
			response.end();
		});
	} else {
		response.end('File not found!!!');
	}
});

server.listen(7077);
console.log("Running in localhost at port 7077");
