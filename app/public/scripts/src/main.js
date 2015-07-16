var React = require('react');
var foo = require('./foo.js');
var $ = require('jquery');

console.log('welcome to the jungle' + foo(100));
var elem = document.getElementById('result');
elem.textContent = 'welcome to the jungle' + foo(100);

var MdlButton = React.createClass({displayName: "MdlButton",
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

var clickHandler = function response() {
	console.log('u clicked');
}

React.render(
	React.createElement("div", null, 	
		React.createElement("h5", null, "Hello, world how are you?!"), 
		React.createElement(MdlButton, {content: 'ballz', onClick: clickHandler})
	),
	document.getElementById('reactResult')
);

$.get("api/playCards", function(data) {
	alert(data.length);
});
