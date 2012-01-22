/* 

		Internal functions / objects

*/

var youtube = {
	html_source: '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/VIDEO_ID" frameborder="0"></iframe>',
	display: function(url) {
		return this.html_source.replace('VIDEO_ID', this.getVideoIdFromUrl(url));
	},
	getVideoIdFromUrl: function(url) {
		if (url) {
			var id = url.split('=')[1];
			if (id) {
				return id;
			} else {
				throw new Error('cannot retrieve an id from the url provided.');
			}
		} else {
			throw new Error('url is null.');
		}		
	}
};

var vimeo = {
	html_source: '',
	display: function(url) {
		return 'no functionality yet'
	}
};

var dailymotion = {
	html_source: '',
	display: function(url) {
		return 'no functionality yet'
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
