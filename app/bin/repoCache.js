var gitHubLoader = require('./gitHubLoader');
 
var repos;
 
gitHubLoader.loader({ 
  startUrl: 'https://api.github.com/search/repositories?q=stars:0..9&sort=updated&order=asc', 
  pageLimit: 2,
  getListFunc: (function (body) { return body.items; })
  }).execute(function(error, response) {
	  console.log('repo cache loaded ' + response.length);
	  repos = response.map(function(r) {
      return {
        id : r.id,
        full_name : r.full_name,
        url : r.url,
        updated_at : r.updated_at,
        stargazers_count : r.stargazers_count,
        watchers_count : r.watchers_count,
        forks_count : r.forks_count,
        open_issues_count : r.open_issues_count        
      };
    });    
  });
  
 var get = function() {
	 return repos;
 }
  
 module.exports = get;