/* 
		Notes

		The get_video_id_from_url() function need to be beefed up for each 
		video provider to handle all possible urls.

		Refactor the functionality that gets the videoId using split.
		This will take an objectarray of string to split by and the position
		of the split you are interesting in 
		e.g. [{splitter: '=', pos: 0}, {splitter: '?', pos: 1}]

*/

/* 

		Internal functions / objects

*/

// default = 640 x 385
var common_functions = require('./common_functions');
var videoWidth	= '100%';
var videoHeight	= '100%';

var youtube = {
	htmlSource: '<iframe class="youtube-player" type="text/html" width="' + videoWidth + '" height="'+ videoHeight + '" src="http://www.youtube.com/embed/VIDEO_ID" frameborder="0"></iframe>',
	display: function(url) {
		return this.htmlSource.replace('VIDEO_ID', this.get_video_id_from_url(url));
	},
	get_video_id_from_url: function(url) {
		if (url) {
			var videoId = common_functions.split(url, [{splitter: '=', index: 1}]);

			if (videoId) {
				return videoId;
			} else {
				throw new Error('cannot retrieve an id from the url provided.');
			}
		} else {
			throw new Error('url is null.');
		}		
	}
};

var vimeo = {
	htmlSource: '<iframe src="http://player.vimeo.com/video/VIDEO_ID?byline=0&amp;portrait=0" width="' + videoWidth + '" height="'+ videoHeight + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>',
	display: function(url) {
		console.log(this.htmlSource.replace('VIDEO_ID', this.get_video_id_from_url(url)));
		return this.htmlSource.replace('VIDEO_ID', this.get_video_id_from_url(url));
	},
	get_video_id_from_url: function(url) {
		if (url) {
				var videoId = common_functions.split(url, [{splitter: 'com/', index: 1}]);
				
				if (videoId) {
					return videoId;
				} else {
					throw new Error('cannot retrieve an id from the url provided.');
				}
		} else {
			throw new Error('url is null.');
		}		
	}
};

var dailymotion = {
	htmlSource: '<iframe width="' + videoWidth + '" height="'+ videoHeight + '" src="http://www.dailymotion.com/embed/video/VIDEO_ID" frameborder="0"></iframe>',
	display: function(url) {
		return this.htmlSource.replace('VIDEO_ID', this.get_video_id_from_url(url));
	},
	get_video_id_from_url: function(url) {
		if (url) {
			if (url.indexOf('/video/') > 0) {
				//var videoId = url.split('/video/')[1].split('_')[0];
				var videoId = common_functions.split(url, [{splitter: '/video/', index: 1}, {splitter: '_', index: 0}]);
				if (videoId) {
					return videoId;
				} else {
					throw new Error('cannot retrieve an id from the url provided.');
				}
			}
		} else {
			throw new Error('url is null.');
		}		
	}
};

var bliptv = {
	htmlSource: '<iframe width="' + videoWidth + '" height="'+ videoHeight + '" src="http://blip.tv/play?posts_id=VIDEO_ID" frameborder="0" allowfullscreen></iframe>',
	display: function(url) {
		return this.htmlSource.replace('VIDEO_ID', this.get_video_id_from_url(url));
	},
	get_video_id_from_url: function(url) {
		if (url) {
			var lastHythen = url.lastIndexOf('-') + 1;
			var videoId = url.slice(lastHythen);

			if (videoId) {
				return videoId;
			} else {
				throw new Error('cannot retrieve an id from the url provided.');
			}
		} else {
			throw new Error('url is null.');
		}		
	}
};

/* 

		External functions

*/

exports.getEmbedHtml = function(url, source, callback) {
		switch(source.toLowerCase()) {
		case 'youtube':
		  callback(null, youtube.display(url));
		  break;
		case 'vimeo':
		  callback(null, vimeo.display(url));
		  break;
		case 'dailymotion':
		  callback(null, dailymotion.display(url));
		  break;
		default:
		  callback(new Error('There isn\'t a provider for this online video source.'));
		}	
}
