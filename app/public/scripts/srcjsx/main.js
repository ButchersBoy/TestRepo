var React = require('react');
var $ = require('jquery');

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
			<tr>
				<td className="mdl-data-table__cell--non-numeric"><span className={"octicon " + this.props.icon} ></span></td>
				<td className="mdl-data-table__cell--non-numeric">{this.props.description}</td>
				<td>{this.props.value}</td>				
				<td><VoteButton icon="octicon-thumbsup" /></td>
			</tr>
		);	
	}
});

var PlayerCard = React.createClass({
	render: function() {
		return (
			<div className="mdl-card mdl-shadow--2dp git-trumps-card-square">
			  <div className="mdl-card__title mdl-card--expand mdl-color--primary">
			    <h5 className="mdl-card__title-text">{this.props.title}</h5>				
			  </div>
			  <div className="mdl-card__title mdl-card--expand mdl-color--primary">
			  	<h5 className="mdl-card__subtitle-text">{this.props.repo.full_name}</h5>
			  </div>
			  <div className="mdl-card__supporting-text">
			  	{this.props.repo.description}				  			    
			  </div>
			  <table className="mdl-data-table mdl-js-data-table">
				  <tbody>
				  	<PlayerCardDataRow icon="octicon-star" description="Stars" value={this.props.repo.stargazers_count} />
					<PlayerCardDataRow icon="octicon-eye" description="Watchers" value={this.props.repo.watchers_count} />
					<PlayerCardDataRow icon="octicon-repo-forked" description="Forks" value={this.props.repo.forks_count} />
					<PlayerCardDataRow icon="octicon-issue-opened" description="Issues" value={this.props.repo.open_issues_count} />
					<PlayerCardDataRow icon="octicon-repo-push" description="Updated" value={this.props.repo.updated_at} />
				  </tbody>
				</table>
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
