var http  = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
    	'Content-Type': 'text/plain'
	});
	res.end('Hello Tyrone! Just adding some extra stuff for git\n');
});
server.listen(process.env.PORT, '0.0.0.0'); 
