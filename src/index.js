/** @jsx React.DOM **/
var React = require('react');
var Chart = require('./progressCircle.js');

var Index = React.createClass({
	getInitialState() {
		return {
			count : 200
		}
	},

	change() {
		this.setState({
			foo: Date.now()
		});
	},

	componentDidMount() {
		setInterval(this.change, 2000);
	},

	render() {
		var charts = [];

		for (var i = 0; i < this.state.count; i++) {
			charts[i] = Chart({ key: i, value: Math.random() })
		}

		return (
			<div>{ charts }</div>
		);
	}
});

React.renderComponent(Index(), document.body);
