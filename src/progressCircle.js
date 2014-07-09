var React      = require("react");
var d3         = require("../vendor/d3.custom");
var Animatable = require('./animatable');
var TAU        = Math.PI * 2;

var ProgressCircle = React.createClass({
	mixins: [Animatable],

	getDefaultProps() {
		return {
			change    : 0,
			height    : 100,
			radius    : 50,
			thickness : 25,
			value     : 1,
			width     : 100
		};
	},

	getScale() {
		return d3.scale.linear().domain([0, 1]).range([0, TAU])
	},

	getTransform() {
		return "translate(" + (this.props.width / 2) + "," + (this.props.height / 2) + ")";
	},

	getArc() {
		return d3.svg.arc().startAngle(0)
			.innerRadius(this.props.radius - this.props.thickness)
			.outerRadius(this.props.radius);
	},

	getEndPoint() {
		var radians = this.getScale()(this.getEasingPosition());
		return this.getArc().endAngle(radians)();
	},

	getDisplayValue() {
		return Math.round(this.getEasingPosition() * 100);
	},

	render() {
		var changeStrength = Math.abs(this.props.change);

		return (
			<svg height={this.props.height} width={this.props.width}>
				<g transform={this.getTransform()}>
					<path d={this.getArc().endAngle(TAU)()} fill="#000" />
					<path ref="progress" d={this.getEndPoint()} fill="#c33" />
				</g>
			</svg>
		);
	}
});

module.exports = ProgressCircle;
