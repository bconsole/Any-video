var express = require('express');
var app 	= express.createServer();
var video = require('./lib/video/video');
var videoEmbedHtml = require('./lib/video/videoEmbedHtml');
// var util 	= require('util');
// var fs 		= require('fs');

app.get('/', function(req, res){
	res.header('Content-Type', 'text/html');	

	video.load(1, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid.url, vid.source.toLowerCase(), function(err, embedHtml) {
				if (err) {
					throw err;
				}
					res.write(embedHtml);
					res.end();					
			});
	});
	
});

function getVideoId(url, callback){

}

// app.get('/pump', function(req, res){
// 	res.header('Content-Type', 'text/html');	
// 	var rs = fs.createReadStream(__dirname + '/public/html_templates/index.html');
// 	console.log(__dirname + '/public/html_templates/index.html');
// 	util.pump(rs, res);
// 	res.end('hello');
// });

app.listen(1979);

console.log('application running on http://localhost:1979/');