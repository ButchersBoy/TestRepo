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


//TODO obsolete
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
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		return (
			<div className="play-card-attribute-set mdl-button mdl-js-button mdl-js-ripple-effect" onClick={this.handleClick}>
				<div className="play-card-attribute-icon"><span className={"octicon " + this.props.icon} ></span></div>
				<div className="play-card-attribute-description">{this.props.description}</div>										
				<div className="play-card-attribute-value">{this.props.value}</div>		
			</div>
		);	
	}
});

var PlayerCard = React.createClass({
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
				<div className="play-card-content">
						<div className="mdl-card__title mdl-card--expand">
							<h5 className="mdl-card__title-text">{this.props.title}</h5>
						</div>
					  	<div className="mdl-card__title mdl-card--expand">
					  		<h5 className="mdl-card__subtitle-text">{this.obscureTitle(this.props.repo.full_name)}</h5>
					  	</div>
					  	<div className="mdl-card__supporting-text">	
					  		{this.props.repo.description}				  			    
					  	</div>				
					  	<div className="play-card-attributes">
			                <PlayerCardDataRow icon="octicon-star" description="Stars" value={this.obscure(this.props.repo.stargazers_count)} onClick={this.handlePlay.bind(this, "Stars")} />
			                <PlayerCardDataRow icon="octicon-eye" description="Watchers" value={this.obscure(this.props.repo.watchers_count)} onClick={this.handlePlay.bind(this, "Watchers")} />
			                <PlayerCardDataRow icon="octicon-repo-forked" description="Forks" value={this.obscure(this.props.repo.forks_count)} onClick={this.handlePlay.bind(this, "Forks")} />
			                <PlayerCardDataRow icon="octicon-issue-opened" description="Issues" value={this.obscure(this.props.repo.open_issues_count)} onClick={this.handlePlay.bind(this, "Issues")} />
			                <PlayerCardDataRow icon="octicon-repo-push" description="Updated" value={this.obscure(Common.formatDate(this.props.repo.updated_at))} onClick={this.handlePlay.bind(this, "Updated")} />
						</div>
					</div>			
			);
		else
			content = (<div onClick={this.handleDismissResult}>win</div>);
		return (			
			<div className="mdl-cell mdl-cell--6-col">
				<div className="mdl-card mdl-shadow--2dp play-card" style={bgImgStyle}>
					 {content}
				</div>
			</div>			
		);		
	}
});

var PlayArea = React.createClass({
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
				<div>loading</div>
			);
		else
			return (
				<section className="section--center mdl-grid">
					<PlayerCard repo={this.state.playerRepo} title="Player 1" onPlay={this.playHandler} playResult={this.state.playResult} onDismissResult={this.dismissResultHandler} />
					<PlayerCard repo={this.state.cpuRepo} title="CPU" obscure={this.state.mode=='play'}  />
				</section>	
			);
	}
});

React.render(
	<PlayArea />,
	document.getElementById('playArea')
);
