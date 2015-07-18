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

var PlayerCard = React.createClass({displayName: "PlayerCard",
	obscure: function(value) {
		return this.props.obscure ? "?"  : value;
	},
	obscureTitle: function(value) {
		return this.props.obscure ? "?/?"  : value;
	},
	handlePlay: function(item) {
		this.props.onPlay(item);
	},
	handleDismissResult: function() {
		this.props.onDismissResult();
	},
	render: function() {
		var bgImgStyle = { background: 'url(' + this.props.repo.owner.avatar_url + ') center / cover' }
		var content;
		if (this.props.playResult == null)
			content = (
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
			                React.createElement(PlayerCardDataRow, {icon: "octicon-star", description: "Stars", value: this.obscure(this.props.repo.stargazers_count), onClick: this.handlePlay.bind(this, "Stars")}), 
			                React.createElement(PlayerCardDataRow, {icon: "octicon-eye", description: "Watchers", value: this.obscure(this.props.repo.watchers_count), onClick: this.handlePlay.bind(this, "Watchers")}), 
			                React.createElement(PlayerCardDataRow, {icon: "octicon-repo-forked", description: "Forks", value: this.obscure(this.props.repo.forks_count), onClick: this.handlePlay.bind(this, "Forks")}), 
			                React.createElement(PlayerCardDataRow, {icon: "octicon-issue-opened", description: "Issues", value: this.obscure(this.props.repo.open_issues_count), onClick: this.handlePlay.bind(this, "Issues")}), 
			                React.createElement(PlayerCardDataRow, {icon: "octicon-repo-push", description: "Updated", value: this.obscure(Common.formatDate(this.props.repo.updated_at)), onClick: this.handlePlay.bind(this, "Updated")})
						)
					)			
			);
		else
			content = (React.createElement("div", {onClick: this.handleDismissResult}, "win"));
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
		this.setState({mode: 'reveal', playResult: 1});				
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
		return {playerRepo: null,  cpuRepo: null, repos: null, nextRepo: 0, mode:'play'};
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
					React.createElement(PlayerCard, {repo: this.state.playerRepo, title: "Player 1", onPlay: this.playHandler, playResult: this.state.playResult, onDismissResult: this.dismissResultHandler}), 
					React.createElement(PlayerCard, {repo: this.state.cpuRepo, title: "CPU", obscure: this.state.mode=='play'})
				)	
			);
	}
});

React.render(
	React.createElement(PlayArea, null),
	document.getElementById('playArea')
);
