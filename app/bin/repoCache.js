var gitHubLoader = require('./gitHubLoader');

console.log('Initialising repo cache.'); 
 
var repos;

/*
//dates
"https://api.github.com/search/repositories?q=pushed:>=2015-07-25&sort=updated&order=desc"
//Stars
'https://api.github.com/search/repositories?q=stars:0..9&sort=updated&order=asc'
*/

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function loadLatestPushed() {
  var currentDate = new Date();
  currentDate.setDate(currentDate.getDate()-1);
  var currentDateStr = currentDate.getFullYear()+"-"+pad(currentDate.getMonth()+1 )+"-"+pad(currentDate.getDate());
  
  var url ="https://api.github.com/search/repositories?q=pushed:>=[[DATE]]+stars:>=10&sort=updated&order=desc".replace("[[DATE]]", currentDateStr);
  
  console.log("Loaded repo set...");
  loadRepoSet(url, function(repoSet) {
    console.log("Loaded repo set " +  repoSet.length);
    repos = repoSet;
  });
  
  console.log(currentDateStr);
}

loadLatestPushed();
setInterval(loadLatestPushed, 120000);

function loadRepoSet(url, handler) {
  gitHubLoader.loader({ 
  startUrl: url, 
  pageLimit: 2,
  getListFunc: (function (body) { return body.items; })
  }).execute(function(error, response) {
	  console.log('Repo cache loaded ' + response.length);
	  var repoSet = response.map(function(r) {
      return {
        id : r.id,
        full_name : r.full_name,
        description : r.description,
        url : r.url,
        updated_at : r.updated_at,
        stargazers_count : r.stargazers_count,
        watchers_count : r.watchers_count,
        forks_count : r.forks_count,
        open_issues_count : r.open_issues_count,
        owner : { avatar_url : r.owner.avatar_url }                
      };
    }); 
    handler(repoSet);   
  });  
}
 

  
 var get = function() {
	 return repos;
 }
  
 module.exports = get;