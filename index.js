var express = require('express');
var app 	= express.createServer();
var video = require('./lib/video/video');
// var util 	= require('util');
// var fs 		= require('fs');

app.get('/', function(req, res){
	res.header('Content-Type', 'text/html');	
	res.write('');

	video.load(1, function(err, vid) {
		res.write(vid.url);
		res.end();
	});
});

// app.get('/pump', function(req, res){
// 	res.header('Content-Type', 'text/html');	
// 	var rs = fs.createReadStream(__dirname + '/public/html_templates/index.html');
// 	console.log(__dirname + '/public/html_templates/index.html');
// 	util.pump(rs, res);
// 	res.end('hello');
// });

app.listen(1979);

console.log('application running on http://localhost:1979/');