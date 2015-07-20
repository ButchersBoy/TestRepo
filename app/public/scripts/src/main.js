var React = require('react');
var $ = require('jquery');
var Common = require('../src/common.js')

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

var PlayResult = React.createClass({displayName: "PlayResult",
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		var clr = {clear:'both'};
		return (
			React.createElement("div", {onClick: this.handleClick, className: "play-card-content"}, 
				React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
					React.createElement("svg", {className: "play-result-icon", viewBox: "0 0 24 24"}, 
						React.createElement("path", {
							d: "M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z"})	
					), 
					React.createElement("h5", {className: "mdl-card__title-text"}, "You WIN!")
				), 
				React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
					React.createElement("span", {className: "octicon octicon-star"}), 
					React.createElement("h5", {className: "mdl-card__subtitle-text"}, "STARS:")
				), 
				React.createElement("div", {className: "mdl-card__supporting-text"}, 
					React.createElement("div", null, 
						React.createElement("h5", {className: "mdl-card__subtitle-text"}, "Player 1 : 6 DEC, 2013 14:15:13"), 
						React.createElement("div", null, "ButchersBoy/MaterialDesignInXamlTookit")
					)
				), 
				React.createElement("div", {className: "mdl-card__supporting-text"}, 
					React.createElement("div", null, 
						React.createElement("h5", {className: "mdl-card__subtitle-text"}, "CPU : 6 DEC, 2013 14:15:13"), 
						React.createElement("div", null, "ButchersBoy/MaterialDesignInXamlTookit")
					)
				), 
				React.createElement("div", {className: "mdl-card__supporting-text"}, 
					"NEXT"
				)
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
	handlePlay: function(item) {
		this.props.onPlay(item);
	},
	render: function() {
		var attrRows = this.props.attrDefs.map(function(attrDef) {
			return (
				React.createElement(PlayerCardDataRow, {
					icon: attrDef.icon, 
					description: attrDef.description, 
					value: this.obscure(eval("this.props.repo."+attrDef.property)), 
					onClick: this.handlePlay.bind(this, attrDef.description)})
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
	handlePlay: function(item) {
		this.props.onPlay(item);
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
			React.createElement("div", {className: "mdl-cell mdl-cell--6-col"}, 
				React.createElement("div", {className: "mdl-card mdl-shadow--2dp play-card", style: bgImgStyle}, 
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
	playHandler: function(item) {				
		this.setState({
			mode: 'reveal', 
			playResult: {
				attribute: item,
				
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
		
		var attributeDefinitions = [
			["Stars", "stargazers_count", "octicon-star"],
			["Watchers", "watchers_count", "octicon-eye" ],
			["Forks", "forks_count", "octicon-repo-forked"],
			["Issues", "open_issues_count", "octicon-issue-opened"], 
			["Updated", "updated_at", "octicon-repo-push"]
		].map(function(item) {
			return {
				description: item[0],
				property: item[1],
				icon: item[2]
			};
		});
		
		return {
			attributeDefinitions : attributeDefinitions,
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
					React.createElement(PlayerCard, {attrDefs: this.state.attributeDefinitions, repo: this.state.playerRepo, title: this.state.playerName, onPlay: this.playHandler, playResult: this.state.playResult, onDismissResult: this.dismissResultHandler}), 
					React.createElement(PlayerCard, {attrDefs: this.state.attributeDefinitions, repo: this.state.cpuRepo, title: this.state.cpuName, obscure: this.state.mode=='play'})
				)	
			);
	}
});

React.render(
	React.createElement(PlayArea, null),
	document.getElementById('playArea')
);
