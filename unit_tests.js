var github = require("./github_facade");

// ----- getUserDetailByUserName -----
exports.getTopContributorsByUserAndRepos = {
	TenContributorsReturned: function(test){
		github.getTopContributorsByUserAndRepos('sage', 'streamlinejs', 10, function(user, repos, statusCode, json){
			test.equal(json.length, 10, 'Should return 10 contributors from GitHub for this repository.');
			
			test.done();
		});
	},
	NonExistingRepositoryReturn404: function(test){
		github.getTopContributorsByUserAndRepos('non-existing', 'non-existing', 10, function(user, repos, statusCode, json){
			test.equal(statusCode, 404, 'Should return 404 error code for non-existing repository.');
			
			test.done();
		});
	}
};

// ----- getUserDetailByUserName -----
exports.getUserDetailByUserName = {
	NonExistingUserTest: function(test){
		github.getUserDetailByUserName('non-existing', function(statusCode, json){
			test.equal(statusCode, 404, 'This user should not exist in GitHub and 404 status code should be returned.');
			
			test.done();
		});
	},
	ExistingUserTest: function(test){
		github.getUserDetailByUserName('calvin-m', function(statusCode, json){
			test.equal(statusCode, 200, 'This user should exist in GitHub and 200 status code should be returned.');
			
			test.done();
		});
	}
};