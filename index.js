var http  = require('http');
var server = http.createServer(function (req, res) {
    res.writeHead(200, {
    	'Content-Type': 'text/plain'
	});
	res.end('Hello Tyrone! Just adding some extra stuff for git, and some more stuff on windows pc\n');
});
server.listen(process.env.PORT, '0.0.0.0'); 
