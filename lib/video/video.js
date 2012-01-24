var fs 			= require('fs');
var rootDir = __dirname;

/* 

		Internal functions

*/

var load = function(id, callback) {
	fs.readFile(rootDir + '/video.json', 'utf8', function(err, data) {
		if (err) {
			callback(err);
		}

		var videos_json = JSON.parse(data).videos; 

		if (videos_json && videos_json.length) {
			for (var i = 0; v = videos_json[i], i < videos_json.length; i++) {
				if (v.id === id) {
					callback(null, v);
					return;
				}
			};
		}
		callback(new Error(videos_jsons.length + ' objecs were checked and a video with the id: ' + id + ' does not exist.'));
	}); // end readFile
} // end internal load function

var loadCollection = function(callback) {
	fs.readFile(rootDir + '/video.json', 'utf8', function(err, data) {
		if (err) {
			callback(err);
		}

		var videos_json = JSON.parse(data).videos; 
		var video_collection = [];

		if (videos_json && videos_json.length) {
			for (var i = 0; v = videos_json[i], i < videos_json.length; i++) {
				video_collection.push(v);
			};
		}

		if (video_collection.length) {
			callback(null, video_collection);
		} else {
			callback(new Error('The database / json file appears to be empty.'));
		}
	}); // end readFile
} // end internal load collection function


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
		if (!isNaN(id) && id > 0) {
			load(id, function(err, video) {
				if (err) {
					callback(err);	
				}

				callback(null, video)
			});
		} else {
			callback(new Error('video id must be a number and greater than 0'));
		}
}

exports.loadCollection = function(callback) {
	loadCollection(function(err, videos) {
		if (err) {
			callback(err);	
		}

		callback(null, videos)
	});
}


