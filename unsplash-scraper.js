var request = require("request");
var exec = require("exec-sync");

var scrape = function() {
    var dlDir = './downloads';
    var url = 'http://api.tumblr.com/v2/blog/unsplash.tumblr.com/posts/photo/?api_key=YOUR_API_KEY_HERE';
    //grabs all images and stores in array
    request(url, function(err, resp, body) {
        if (err) throw err;
	var res = JSON.parse(body);
	var posts = res.response.posts;
	for ( post in posts ) {
	  var post = posts[post];
	  var fileUrl = post.photos[0].original_size.url;
	  var fileName = fileUrl.substring(fileUrl.lastIndexOf('/')+1);
	  var wget = 'wget -P ' + dlDir + ' ' + fileUrl;
	  var child = exec(wget, function(err, stdout, stderr) {
	    if (err)
		throw err;
	  });
	  console.log(fileName + ' downloaded to ' + dlDir);
	}
    });
}();
