var github = require("./github_facade");

github.getUserDetailByUserName('non-existing', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});

github.getUserDetailByUserName('calvin-m', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});

//Get top 10 contributors
github.getTopUsers(10, function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});
