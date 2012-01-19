var http  = require('http');
var server = http.createServer(function (req, res) {
	res.writeHead(200, {
		'Content-Type': 'text/plain'	
	});	
	res.end('Hello Tyrone\n');
});
server.listen(process.env.PORT, '0.0.0.0'); 