// JavaScript Document
var net = require('net');

//var server = net.createServer(function(socket){
//	socket.write('Hello\n');
//	socket.end('world\n');

//});


var server = net.createServer(function(socket){
	socket.write('Hello\n');
	socket.write('world\n');
	
	socket.on('data', function(data){
		socket.write(data);	
	});
});

server.listen(1337);