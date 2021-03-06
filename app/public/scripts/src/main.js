var React = require('react');
var $ = require('jquery');
var Common = require('../src/common.js');
var WinStreakService = require('../src/winStreakService');

var MdlRaisedButton = React.createClass({displayName: "MdlRaisedButton",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			React.createElement("button", {ref: "btn", className: "mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect", 
					onClick: this.handleClick}, 
				this.props.content
			)
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});

var MdlFlatButton = React.createClass({displayName: "MdlFlatButton",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			React.createElement("button", {ref: "btn", className: "mdl-button mdl-js-button mdl-js-ripple-effect", 
					onClick: this.handleClick}, 
				this.props.content
			)
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});


//TODO obsolete
var VoteButton = React.createClass({displayName: "VoteButton",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			React.createElement("button", {ref: "btn", className: "mdl-button mdl-js-button mdl-button--icon mdl-button--colored", 
					onClick: this.handleClick}, 
				React.createElement("span", {className: "octicon " + this.props.icon})
			)
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});

var PlayerCardDataRow = React.createClass({displayName: "PlayerCardDataRow",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			React.createElement("div", {className: "play-card-attribute-set mdl-button mdl-js-button mdl-js-ripple-effect", onClick: this.handleClick}, 
				React.createElement("div", {className: "play-card-attribute-icon"}, React.createElement("span", {className: "octicon " + this.props.icon})), 
				React.createElement("div", {className: "play-card-attribute-description"}, this.props.description), 										
				React.createElement("div", {className: "play-card-attribute-value"}, this.props.value)		
			)
		);	
	}
});

var PlayResultScoreItem = React.createClass({displayName: "PlayResultScoreItem",
	render: function() {
		return (
			React.createElement("div", {className: "mdl-card__supporting-text"}, 
				React.createElement("div", null, 
					React.createElement("h5", {className: "mdl-card__subtitle-text"}, this.props.name, " : ", this.props.value), 
					React.createElement("div", null, this.props.repoName)
				)
			)	
		);
	}
});

var Trophy = React.createClass({displayName: "Trophy",
	render: function() {
		return (
			React.createElement("svg", {className: "play-result-icon", viewBox: "0 0 24 24"}, 
				React.createElement("path", {
					d: "M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z"})	
			)
		);
	}
});

var PlayResult = React.createClass({displayName: "PlayResult",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {		
		var summary;
		switch (this.props.playResult.result) {
			case -1:
				summary = React.createElement("h5", {className: "mdl-card__title-text"}, "CPU Wins!");
				break;
			case 0:
				summary = React.createElement("h5", {className: "mdl-card__title-text"}, "Draw!");
				break;
			case 1:
				summary = (
					React.createElement("div", null, 
						React.createElement(Trophy, null), 
						React.createElement("h5", {className: "mdl-card__title-text"}, "You WIN!")
					)					
				);
		};
		
		return (
			React.createElement("div", {className: "play-card-content"}, 
				React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
					summary
				), 
				React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
					React.createElement("span", {className: "octicon " + this.props.playResult.attributes.icon}), 
					React.createElement("h5", {className: "mdl-card__subtitle-text play-result-attribute"}, this.props.playResult.attributes.description, " :")
				), 
				React.createElement(PlayResultScoreItem, {name: this.props.playResult.playerName, value: this.props.playResult.playerValue, repoName: this.props.playResult.playerRepoName}), 
				React.createElement(PlayResultScoreItem, {name: this.props.playResult.cpuName, value: this.props.playResult.cpuValue, repoName: this.props.playResult.cpuRepoName}), 
				React.createElement(MdlFlatButton, {content: "NEXT", onClick: this.handleClick})
			)	
		);
	}
});

var PlayActions = React.createClass({displayName: "PlayActions",
	obscure: function(value) {
		return this.props.obscure ? "?"  : value;
	},
	obscureTitle: function(value) {
		return this.props.obscure ? "?/?"  : value;
	},
	handlePlay: function(attributes) {
		this.props.onPlay(attributes);
	},
	render: function() {
		var attrRows = this.props.attributesSet.map(function(attributes) {
			return (
				React.createElement(PlayerCardDataRow, {
					icon: attributes.icon, 
					description: attributes.description, 
					value: this.obscure(eval("this.props.repo."+attributes.property)), 
					onClick: this.handlePlay.bind(this, attributes)})
			);
		}.bind(this));
		return (
			React.createElement("div", {className: "play-card-content"}, 
				React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
					React.createElement("h5", {className: "mdl-card__title-text"}, this.props.title)
				), 
			  	React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
			  		React.createElement("h5", {className: "mdl-card__subtitle-text"}, this.obscureTitle(this.props.repo.full_name))
			  	), 
			  	React.createElement("div", {className: "mdl-card__supporting-text"}, 	
			  		this.props.repo.description				  			    
			  	), 				
			  	React.createElement("div", {className: "play-card-attributes"}, 
				 	attrRows
				)
			)			
		);
	}
})

var PlayerCard = React.createClass({displayName: "PlayerCard",
	handlePlay: function(attributes) {
		this.props.onPlay(attributes);
	},
	handleDismissResult: function() {
		this.props.onDismissResult();
	},
	render: function() {
		var bgImgStyle = { background: 'url(' + this.props.repo.owner.avatar_url + ') center / cover' }
		var $__0=     this.props,playResult=$__0.playResult,other=(function(source, exclusion) {var rest = {};var hasOwn = Object.prototype.hasOwnProperty;if (source == null) {throw new TypeError();}for (var key in source) {if (hasOwn.call(source, key) && !hasOwn.call(exclusion, key)) {rest[key] = source[key];}}return rest;})($__0,{playResult:1});
		var content;
		if (this.props.playResult == null)
			content = React.createElement(PlayActions, React.__spread({},  other));
		else
			content = React.createElement(PlayResult, {onClick: this.handleDismissResult, playResult: playResult});
		return (			
			React.createElement("div", {className: "mdl-cell mdl-cell--6-col play-card-cell"}, 
				React.createElement("div", {className: "mdl-card mdl-shadow--2dp", style: bgImgStyle}, 
					 content
				)
			)			
		);		
	}
});

var PlayArea = React.createClass({displayName: "PlayArea",
	loadRepos: function() {
		$.get("api/playCards", function(data) {		
			if (data.length < 2)
				//TODO handle error#
				console.log("no cards!");
			else
			{
				var nextRepo = this.state.nextRepo;
				this.setState({
					repos: data,
					playerRepo: data[nextRepo++],  
					cpuRepo: data[nextRepo++],
					nextRepo: nextRepo					
				});
			}
		}.bind(this));
	},
	playHandler: function(attributes) {
		var playerValue = eval("this.state.playerRepo."+attributes.property);
		var cpuValue = eval("this.state.cpuRepo."+attributes.property);
		var result = attributes.comparer(playerValue, cpuValue);
		if (result == 1)
			this.props.winStreakService.inc();
		else
			this.props.winStreakService.reset();
		this.setState({
			mode: 'reveal', 
			playResult: {
				attributes: attributes,
				result: result, /* 1=p1 win, 0 = draw, -1=CPU win */
				cpuName: this.state.cpuName,
				cpuRepoName: this.state.cpuRepo.full_name,
				cpuValue: cpuValue,
				playerName: this.state.playerName,
				playerRepoName: this.state.playerRepo.full_name,
				playerValue: playerValue
			}
		});				
	},
	dismissResultHandler: function() {
		var nextRepo = this.state.nextRepo;
		this.setState({
			playerRepo: this.state.repos[nextRepo++],  
			cpuRepo: this.state.repos[nextRepo++],
			nextRepo: nextRepo,
			mode: 'play', 
			playResult: null
		});
	},
	getInitialState: function() {
		
		var compare = function (left,right) {
			if (left > right) return 1;
			if (left < right) return -1;
			return 0;
		};
		var compareReverse = function (left,right) {
			if (left > right) return -1;
			if (left < right) return 1;
			return 0;
		} 		
		var attributesSet = [
			["Stars", "stargazers_count", "octicon-star", compare],
			["Watchers", "watchers_count", "octicon-eye", compare],
			["Forks", "forks_count", "octicon-repo-forked", compare],
			["Issues", "open_issues_count", "octicon-issue-opened", compareReverse], 
			["Updated", "updated_at", "octicon-repo-push", compare]
		].map(function(item) {
			return {
				description: item[0],
				property: item[1],
				icon: item[2],
				comparer: item[3]
			};
		});		
		return {
			attributesSet : attributesSet,
			playerRepo: null,  
			cpuRepo: null, 
			repos: null, 
			nextRepo: 0, 
			mode: 'play',
			playerName: 'Player 1',
			cpuName: 'CPU'
			};
	},
	componentDidMount: function() {
		this.loadRepos();
	},
	render: function() {
		if (this.state.playerRepo == null)
			return (
				React.createElement("div", null, "loading")
			);
		else
			return (
				React.createElement("section", {className: "section--center mdl-grid"}, 
					React.createElement(PlayerCard, {attributesSet: this.state.attributesSet, repo: this.state.playerRepo, title: this.state.playerName, onPlay: this.playHandler, playResult: this.state.playResult, onDismissResult: this.dismissResultHandler}), 
					React.createElement(PlayerCard, {attributesSet: this.state.attributesSet, repo: this.state.cpuRepo, title: this.state.cpuName, obscure: this.state.mode=='play'})
				)	
			);
	}
});

var WinStreak = React.createClass({displayName: "WinStreak",
	getInitialState: function() {
		return { streak: 0};
	},
	componentDidMount: function() {
		this.props.winStreakService.subscribe(function(val) {
			this.setState({ streak: val});
		}.bind(this));	
	},	
	render: function() {
		var nodes = [];
		for (var i = 0; i < this.state.streak; i++)
			nodes.push(React.createElement(Trophy, null))
		return (
			React.createElement("div", null, nodes)	
		);
	}
});



React.render(
	React.createElement(WinStreak, {winStreakService: WinStreakService}),
	document.getElementById('winStreak')
)

React.render(
	React.createElement(PlayArea, {winStreakService: WinStreakService}),
	document.getElementById('playArea')
);
