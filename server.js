var express = require('express');
var app 	= express.createServer();
var video = require('./lib/video/video');
var videoEmbedHtml = require('./lib/video/videoEmbedHtml');
var rootDir = __dirname;
var util 	= require('util');
var fs 		= require('fs');

function page_load(req, res, id) {
	getTemplate(res, function(err) {
		if (err) {
			throw err;
		}

		video.load(id, function(err, vid) {
			videoEmbedHtml.getEmbedHtml(vid, function(err, embedHtml) {
				if (err) {
					throw err;
				}

				res.write('<div id="content">' + embedHtml + '<br clear="all" /></div>');
				res.end();					
			});
		});
	});	
}

function getTemplate(res, callback){	
	loadHead(function(err, head) {
		if (err) {
			throw err;
		}
		res.header('Content-Type', 'text/html');	
		res.write(head);
		//res.write('<h1>Watcha Watching</h1>');

		loadNav(function(err, nav){
			res.write(nav);

			callback(null)
		});	
	});
}

function loadHead(callback) {
	var h = '';
	h += '<head>';
	h += '<title>Watcha Watching</title>';
	h += '<script type="text/javascript" src="http://code.jquery.com/jquery.min.js"></script>';
	h += '<link href="/css-norm" type="text/css" rel="stylesheet" />';
	h += '<link href="/css-base" type="text/css" rel="stylesheet" />';
	h += '<link href="/css-video" type="text/css" rel="stylesheet" />';
	h += '</head>';

	callback(null, h);
}

function loadNav(callback) {
	video.loadCollection(function(err, videos) {
		if (err) {
			throw err;
		}

		if (videos.length) {
			var nav = '';
			for (var i = 0; v = videos[i], i < videos.length; i++) {
				nav += '<li><a href="/' + v.source.toLowerCase() + '">' + v.name + '</a></li>';
			}

			callback(null, '<div id="side"><ul>' + nav + '</ul><br clear="all" /></div>');
		} else {
			callback(new Error('no videos were returned'));
		}
	});		
}

app.get('/youtube', function(req, res){
	page_load(req, res, 1);
});

app.get('/dailymotion', function(req, res){
	page_load(req, res, 3);
});

app.get('/vimeo', function(req, res){
	page_load(req, res, 2);
});

app.get('/bliptv', function(req, res){
	page_load(req, res, 4);		
});

app.get('/css-norm', function(req, res){
	res.header('Content-Type', 'text/css');
	var rs = fs.createReadStream(__dirname + '/public/css/normalize.css');
	util.pump(rs, res);	
});

app.get('/css-base', function(req, res){
	res.header('Content-Type', 'text/css');
	var rs = fs.createReadStream(__dirname + '/public/css/base.css');
	util.pump(rs, res);	
});

app.get('/css-video', function(req, res){
	res.header('Content-Type', 'text/css');
	var rs = fs.createReadStream(__dirname + '/public/css/video.css');
	util.pump(rs, res);	
});

app.get('/', function(req, res){
	res.header('Content-Type', 'text/html');
	res.write('Watcha Watching');
	res.end();
});

app.listen(1979);

console.log('application running on http://localhost:1979/');