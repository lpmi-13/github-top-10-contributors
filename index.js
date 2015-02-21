var github = require("./github_facade");

/*
github.getUserDetailByUserName('non-existing', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});

github.getUserDetailByUserName('calvin-m', function(statusCode, json){
	console.log(statusCode);
	console.log(json);
});
*/

//Get all contributors
github.getTopContributorsByUserAndRepos('sage','streamlinejs', null, function(statusCode, json){
	console.log(statusCode);
	
	console.log(json);
	console.log(json.length + ' contributors');
});


//Get top 10 contributors
github.getTopContributorsByUserAndRepos('sage','streamlinejs', 10, function(statusCode, json){
	console.log(statusCode);
	
	console.log(json);
	console.log(json.length + ' contributors');
});
