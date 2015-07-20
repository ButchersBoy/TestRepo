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

var PlayResult = React.createClass({
	handleClick: function() {
		this.props.onClick();	
	},
	render: function() {
		var clr = {clear:'both'};
		return (
			<div onClick={this.handleClick} className="play-card-content">
				<div className="mdl-card__title mdl-card--expand">
					<svg className="play-result-icon" viewBox="0 0 24 24">
						<path  
							d="M20.2,2H19.5H18C17.1,2 16,3 16,4H8C8,3 6.9,2 6,2H4.5H3.8H2V11C2,12 3,13 4,13H6.2C6.6,15 7.9,16.7 11,17V19.1C8.8,19.3 8,20.4 8,21.7V22H16V21.7C16,20.4 15.2,19.3 13,19.1V17C16.1,16.7 17.4,15 17.8,13H20C21,13 22,12 22,11V2H20.2M4,11V4H6V6V11C5.1,11 4.3,11 4,11M20,11C19.7,11 18.9,11 18,11V6V4H20V11Z" />	
					</svg>
					<h5 className="mdl-card__title-text">You WIN!</h5>
				</div>
				<div className="mdl-card__title mdl-card--expand">
					<span className={"octicon octicon-star"} ></span>
					<h5 className="mdl-card__subtitle-text">STARS:</h5>
				</div>
				<div className="mdl-card__supporting-text">
					<div>
						<h5 className="mdl-card__subtitle-text">Player 1 : 6 DEC, 2013 14:15:13</h5>
						<div>ButchersBoy/MaterialDesignInXamlTookit</div>
					</div>
				</div>
				<div className="mdl-card__supporting-text">
					<div>
						<h5 className="mdl-card__subtitle-text">CPU : 6 DEC, 2013 14:15:13</h5>
						<div>ButchersBoy/MaterialDesignInXamlTookit</div>
					</div>
				</div>
				<div className="mdl-card__supporting-text">
					NEXT
				</div>
			</div>	
		);
	}
});

var PlayActions = React.createClass({
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
				<PlayerCardDataRow 
					icon={attrDef.icon} 
					description={attrDef.description} 
					value={this.obscure(eval("this.props.repo."+attrDef.property))} 
					onClick={this.handlePlay.bind(this, attrDef.description)} />
			);
		}.bind(this));
		return (
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
				 	{attrRows}
				</div>
			</div>			
		);
	}
})

var PlayerCard = React.createClass({
	handlePlay: function(item) {
		this.props.onPlay(item);
	},
	handleDismissResult: function() {
		this.props.onDismissResult();
	},
	render: function() {
		var bgImgStyle = { background: 'url(' + this.props.repo.owner.avatar_url + ') center / cover' }
		var { playResult, ...other } = this.props;
		var content;
		if (this.props.playResult == null)
			content = <PlayActions {...other}  />;
		else
			content = <PlayResult onClick={this.handleDismissResult} playResult={playResult} />;
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
				<div>loading</div>
			);
		else
			return (
				<section className="section--center mdl-grid">
					<PlayerCard attrDefs={this.state.attributeDefinitions} repo={this.state.playerRepo} title={this.state.playerName} onPlay={this.playHandler} playResult={this.state.playResult} onDismissResult={this.dismissResultHandler} />
					<PlayerCard attrDefs={this.state.attributeDefinitions} repo={this.state.cpuRepo} title={this.state.cpuName} obscure={this.state.mode=='play'}  />
				</section>	
			);
	}
});

React.render(
	<PlayArea />,
	document.getElementById('playArea')
);
