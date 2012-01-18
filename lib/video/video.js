var fs 			= require('fs');
var rootDir = __dirname;

var _video = function(id) {
	// list all the video properties and methods
	this.id 					= -1;
	this.name 				= '';
	this.description 	= '';
	this.url 					= '';
	this.source 			= '';
	this.file_type 		= '';
	this.category		 	= ''; // array of strings
	this.sequence 		= 0;
	this.uploaded_by 	= '';
	this.comments 		= []; // list of comment objects
	this.watched_by 	= []; // list of watched_by objects

	if (id) {		
		this.id = id; // if an id is supplied use this in the load method
	}
	
}

/* 

		Internal functions

*/

var populateObject = function(video, obj) {
	if (obj) {
		// update this mehtod so that it loops through all the key value pairs
		video.name 					= obj.name;
		video.description 	= obj.description;
		video.url 					= obj.url;
		video.source 				= obj.source;
		video.file_type 		= obj.file_type;
		video.category		 	= obj.category; // array of strings
		video.sequence 			= obj.sequence;
		video.uploaded_by 	= obj.uploaded_by;
		video.comments 			= obj.comments; // list of comment objects
		video.watched_by 		= obj.watched_by; // list of watched_by objects		
	}	
}	
var load = function(video, callback) {
	// this function will be replaced with one that queries a database
	fs.readFile(rootDir + '/video.json', 'utf8', function(err, data) {
		if (err) {
			callback(err);
		}

		var obj = JSON.parse(data); 

		if (obj.videos.length === 1) {

			populateObject(video, obj.videos[0]);	

			callback(null, video);
		}
	}); // end readFile
}

// _video.prototype.loadCollection = function() {
// 	console.log('loading a collection of videos');
// 	return 'loading a collection of videos: ' + this.id;
// }

// _video.prototype.delete = function() {
// 	return 'delete a video: ' + this.id;
// }

// _video.prototype.save = function() {
// 	// this will be both insert and update depending on whether id is -1
// 	return 'save a video: ' + this.id;
// }

/* 

		External functions

*/

exports.load = function(id, callback) {
	try {
		if (id > 0 && !isNaN(id)) {
			load(new _video(id), function(err, video){
				if (err) {
					callback(err);	
				}

				callback(null, video)
			});

		} else {
			throw 'video id must be a number and greater than 0';
		}

	} catch (err) {
		callback(err);
	}	
}

// exports.test = function(msg, callback) {
// 	console.log('hitting the test function');

// 	try {
// 		setTimeout(function(){
// 			callback(null, 'the message sent to the test function was: "' + msg + '"');
// 		}, 3000);	

// 	} catch (err) {
// 		callback(err);
// 	}
// }

