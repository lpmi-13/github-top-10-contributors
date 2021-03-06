//var http = require("http");
var https = require("https"); // GitHub API v3 requires HTTPS

//var gitHubUrl = "https://api.github.com/users/calvin-m";
var defaultOptions = {
		host: 'api.github.com',
		port: 443,
		path: '/users/calvin-m', // will need to overwrite this property as needed
		method: 'GET',
		headers: {
			'User-Agent': 'Awesome-Nodejs-App', // GitHub API v3 requires User-Agent
			'Content-Type': 'application/json'
		}
	};
	
module.exports.getTopContributorsByUserAndRepos = function(user, repos, count, onResult) {
	// var options = Object.clone(defaultOptions); // ES5 Object.clone // NOT ready: TypeError: Object function Object() { [native code] } has no method 'clone'
	var options = defaultOptions; // Not good but ok since I can assume "options.path" will always be re-assigned properly for each function.
	// V3 API
	//syntax: repos/:user/:repo/collaborators [GET]
	// Ex: https://api.github.com/repos/sage/streamlinejs/contributors
	options.path = '/repos/'+ user+'/'+repos+'/contributors'; // NOTE: result is sorted by "contributions"
	
	var req = https.request(options, function(res){
		var output='';
		console.log(options.host + ':' + res.statusCode);
		
		res.setEncoding('utf8');
		
		res.on('data', function (chunk){
			output += chunk;
		});
		
		res.on('end', function(){
			var obj = JSON.parse(output);
			if(count && count > 0){
				var subset = [];
				for(var i=0; i<count && i<obj.length; i++){
					subset.push(obj[i]);
				}
				
				onResult(user, repos, res.statusCode, subset);
			}
			else {// return all users
				onResult(user, repos, res.statusCode, obj);
			}
		});
	});
	
	req.on('error', function(err){
		//res.send('error: ' + err.message);
	});
	
	req.end();
};

module.exports.getUserDetailByUserName = function(userName, onResult) {
	//var options = Object.clone(defaultOptions); // ES5 Object.clone
	var options = defaultOptions;
	
	options.path = '/users/' + userName;
	var req = https.request(options, function(res){
		var output='';
		console.log(options.host + ':' + res.statusCode);
		
		res.setEncoding('utf8');
		
		res.on('data', function (chunk){
			output += chunk;
		});
		
		res.on('end', function(){
			var obj = JSON.parse(output);
			onResult(res.statusCode, obj);
		});
	});
	
	req.on('error', function(err){
		//res.send('error: ' + err.message);
	});
	
	req.end();
};