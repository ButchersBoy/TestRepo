var React = require('react');
var $ = require('jquery');
var Common = require('../src/common.js')

var MdlRaisedButton = React.createClass({
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			<button ref="btn" className="mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect"
					onClick={this.handleClick}>
				{this.props.content}
			</button>
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});

var MdlFlatButton = React.createClass({
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			<button ref="btn" className="mdl-button mdl-js-button mdl-js-ripple-effect"
					onClick={this.handleClick}>
				{this.props.content}
			</button>
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});



var VoteButton = React.createClass({
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			<button ref="btn" className="mdl-button mdl-js-button mdl-button--icon mdl-button--colored"
					onClick={this.handleClick}>
				<span className={"octicon " + this.props.icon} ></span>
			</button>
		);
	},
	componentDidMount: function() {
		componentHandler.upgradeElement(React.findDOMNode(this.refs.btn), 'MaterialButton');		
	} 
});

var PlayerCardDataRow = React.createClass({
	render: function() {
		return (
			<div className="play-card-attribute-set mdl-button mdl-js-button mdl-js-ripple-effect">
				<div className="play-card-attribute-icon"><span className={"octicon " + this.props.icon} ></span></div>
				<div className="play-card-attribute-description">{this.props.description}</div>										
				<div className="play-card-attribute-value">{this.props.value}</div>		
			</div>
		);	
	}
});

var PlayerCard = React.createClass({
	render: function() {
		var bgImgStyle = {background: 'url(' + this.props.repo.owner.avatar_url + ') center / cover'}
		return (			
			<div className="mdl-card mdl-shadow--2dp play-card" style={bgImgStyle}>
				<div className="play-card-content">
					<div className="mdl-card__title mdl-card--expand">
						<h5 className="mdl-card__title-text">{this.props.title}</h5>
					</div>
				  	<div className="mdl-card__title mdl-card--expand">
				  		<h5 className="mdl-card__subtitle-text">{this.props.repo.full_name}</h5>
				  	</div>
				  	<div className="mdl-card__supporting-text">
				  		{this.props.repo.description}				  			    
				  	</div>				
				  	<div className="play-card-attributes">
		                <PlayerCardDataRow icon="octicon-star" description="Stars" value={this.props.repo.stargazers_count} />
		                <PlayerCardDataRow icon="octicon-eye" description="Watchers" value={this.props.repo.watchers_count} />
		                <PlayerCardDataRow icon="octicon-repo-forked" description="Forks" value={this.props.repo.forks_count} />
		                <PlayerCardDataRow icon="octicon-issue-opened" description="Issues" value={this.props.repo.open_issues_count} />
		                <PlayerCardDataRow icon="octicon-repo-push" description="Updated" value={Common.formatDate(this.props.repo.updated_at)} />
					</div>
				</div>
			</div>			
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
			<PlayerCard repo={data[0]} title="P1" />,
			document.getElementById('playerCardPlace')
		);		
		React.render(
			<PlayerCard repo={data[1]} title="CPU" />,
			document.getElementById('cpuCardPlace')
		);
	}
	
	console.log('loaded ' + data.length);
});
