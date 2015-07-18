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
	render: function() {
		return (
			React.createElement("div", {className: "play-card-attribute-set mdl-button mdl-js-button mdl-js-ripple-effect"}, 
				React.createElement("div", {className: "play-card-attribute-icon"}, React.createElement("span", {className: "octicon " + this.props.icon})), 
				React.createElement("div", {className: "play-card-attribute-description"}, this.props.description), 										
				React.createElement("div", {className: "play-card-attribute-value"}, this.props.value)		
			)
		);	
	}
});

var PlayerCard = React.createClass({displayName: "PlayerCard",
	render: function() {
		var bgImgStyle = {background: 'url(' + this.props.repo.owner.avatar_url + ') center / cover'}
		return (			
			React.createElement("div", {className: "mdl-card mdl-shadow--2dp play-card", style: bgImgStyle}, 
				React.createElement("div", {className: "play-card-content"}, 
					React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
						React.createElement("h5", {className: "mdl-card__title-text"}, this.props.title)
					), 
				  	React.createElement("div", {className: "mdl-card__title mdl-card--expand"}, 
				  		React.createElement("h5", {className: "mdl-card__subtitle-text"}, this.props.repo.full_name)
				  	), 
				  	React.createElement("div", {className: "mdl-card__supporting-text"}, 
				  		this.props.repo.description				  			    
				  	), 				
				  	React.createElement("div", {className: "play-card-attributes"}, 
		                React.createElement(PlayerCardDataRow, {icon: "octicon-star", description: "Stars", value: this.props.repo.stargazers_count}), 
		                React.createElement(PlayerCardDataRow, {icon: "octicon-eye", description: "Watchers", value: this.props.repo.watchers_count}), 
		                React.createElement(PlayerCardDataRow, {icon: "octicon-repo-forked", description: "Forks", value: this.props.repo.forks_count}), 
		                React.createElement(PlayerCardDataRow, {icon: "octicon-issue-opened", description: "Issues", value: this.props.repo.open_issues_count}), 
		                React.createElement(PlayerCardDataRow, {icon: "octicon-repo-push", description: "Updated", value: Common.formatDate(this.props.repo.updated_at)})
					)
				)
			)			
		);		
	}
});

var clickHandler = function response() {
	console.log('u clicked');
}





/*
React.render(
	<div>	
		<h5>Hello, world how are you?!</h5>
		<MdlRaisedButton content={'ballz'} onClick={clickHandler} />
	</div>,
	document.getElementById('reactResult')
);
*/

$.get("api/playCards", function(data) {
	
	if (data.length < 2)
		//TODO handle error#
		console.log("no cards!");
	else
	{
		React.render(
			React.createElement(PlayerCard, {repo: data[0], title: "P1"}),
			document.getElementById('playerCardPlace')
		);		
		React.render(
			React.createElement(PlayerCard, {repo: data[1], title: "CPU"}),
			document.getElementById('cpuCardPlace')
		);
	}
	
	console.log('loaded ' + data.length);
});
