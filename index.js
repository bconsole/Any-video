var express = require('express');
var app 	= express.createServer();
var video = require('./lib/video/video');
var videoEmbedHtml = require('./lib/video/videoEmbedHtml');

// var util 	= require('util');
// var fs 		= require('fs');


app.get('/', function(req, res){
	res.header('Content-Type', 'text/html');	
	var html =  '<h1>Watcha Watching</h1>'
			html += '<h2>URLs</h2>'
			html += '<p>/youtube</p>'
			html += '<p>/vimeo</p>'
			html += '<p>/dailymotion</p>'

	res.end(html);					
});

app.get('/youtube', function(req, res){
	video.load(1, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid.url, vid.source.toLowerCase(), function(err, embedHtml) {
				if (err) {
					throw err;
				}

				res.header('Content-Type', 'text/html');	
				res.write(embedHtml);
				res.end();					
			});
	});
});

app.get('/dailymotion', function(req, res){
	video.load(3, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid.url, vid.source.toLowerCase(), function(err, embedHtml) {
				if (err) {
					throw err;
				}

				res.header('Content-Type', 'text/html');	
				res.write(embedHtml);
				res.end();					
			});
	});
});

app.get('/vimeo', function(req, res){
	video.load(2, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid.url, vid.source.toLowerCase(), function(err, embedHtml) {
				if (err) {
					throw err;
				}

				res.header('Content-Type', 'text/html');	
				res.write(embedHtml);
				res.end();					
			});
	});
});

app.get('/bliptv', function(req, res){
	video.load(4, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid.url, vid.source.toLowerCase(), function(err, embedHtml) {
				if (err) {
					throw err;
				}

				res.header('Content-Type', 'text/html');	
				res.write(embedHtml);
				res.end();					
			});
	});

	// res.header('Content-Type', 'text/html');	
	// res.write('<iframe src="http://blip.tv/play/gbk7gufWHwI.html?p=1" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>');
	// res.end();					
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