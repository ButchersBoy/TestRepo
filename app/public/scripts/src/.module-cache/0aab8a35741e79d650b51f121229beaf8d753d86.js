var React = require('react');
var foo = require('./foo.js');

console.log('welcome to the jungle' + foo(100));
var elem = document.getElementById('result');
elem.textContent = 'welcome to the jungle' + foo(100);

React.render(
	React.createElement("h1", null, "Hello, world!"),
	document.getElementById('reactResult')
);