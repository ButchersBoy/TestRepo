var request = require("request");
var environment = require("../.settings/environment.json");

function PageDetail(limit) {
	this.limit = limit;
	this.current = 0;
}

/* options { startUrl, pageLimit, [getListFunc]
	
*/
var GitHubLoader = function(options) {	
	
	options.getListFunc = options.getListFunc === undefined ? (function (body) { return body; }) : options.getListFunc;	
	this.execute = function(handler) {				
		var results = new Array();		
		executeNext(options.startUrl, options.getListFunc, new PageDetail(options.pageLimit), results, handler);		
	};

	function executeNext(url, getListFunc, pageDetail, results, handler) {
				
		var requestOptions = {
		    url: url, 
			getListFunc: getListFunc,
		    method: "GET", 
		    headers: {'User-Agent' : 'ButchersBoy', 'Accept' : 'application/vnd.github.v3.star+json'},
		    proxy: environment.proxy,
		    json: true
		};			
		
//console.log("request: " + url);
		request(requestOptions, function(error, response, body) {			
			if (error)
				handler(error);
			else {
				var list = getListFunc(body);
				for (var i = 0; i < list.length; i++)
					results.push(list[i]);
					
				pageDetail.current ++;
									
//console.log(results.length);
				var nextUrl = findNextUrl(response.headers);
//console.log("nextUrl: " + nextUrl);
				if (nextUrl != null && pageDetail.current < pageDetail.limit)
					executeNext(nextUrl, requestOptions.getListFunc, pageDetail, results, handler);
				else				
					handler(null, results);
			}
		});
	}

	function findNextUrl(responseHeaders) {
		if (responseHeaders.link != undefined)
		{		
			var findPattern = /<.+>;\s?rel\="next"/
			var findPatternResult = findPattern.exec(responseHeaders.link);
			if (findPatternResult != null)
			{
				var shrinkPattern = /<.+>/ 
				var result = shrinkPattern.exec(findPatternResult.toString()).toString().replace('<', '').replace('>', '');

				return result;
			}		
		}
		return null;
	}

};

exports.loader = function(startUrl, pageLimit) {
	return new GitHubLoader(startUrl, pageLimit);
};