var invariant = require('react/lib/invariant');

var easing = {
	easeOutSin: function (t, b, c, d) {
		return c * Math.sin(t / d * (Math.PI / 2)) + b;
	}
}

var AnimatedChart = {

	getDefaultProps() {
		return {
			duration : 1000,
			easing   : 'easeOutSin'
		}
	},

	getInitialState() {
		return {
			birth : Date.now(),
			start : 0
		}
	},

	animationInProgress: function() {
		return this.getElapsedTime() < this.props.duration
	},

	getElapsedTime() {
		return Math.min(Date.now() - this.state.birth, this.props.duration)
	},

	getEasingPercentage() {
		return this.getEasingPosition() / this.props.value
	},

	getEasingPosition() {
		var curve = easing[this.props.easing]
		return curve(this.getElapsedTime(), this.state.start, this.props.value - this.state.start, this.props.duration)
	},

	tick() {
		if (this.animationInProgress() && this.isMounted()) {
			this.forceUpdate()
			requestAnimationFrame(this.tick)
		}
	},

	updateSnapshot() {
		this.setState({
			birth : Date.now(),
			start : this.getEasingPosition()
		})

		requestAnimationFrame(this.tick)
	},

	componentWillReceiveProps(nextProps) {
		if (nextProps.value !== this.props.value) {
			this.updateSnapshot()
		}
	},

	componentDidMount() {
		invariant(this.props.hasOwnProperty('value'), 'AnimatedChart requires a value property')
		this.updateSnapshot()
	}
}

module.exports = AnimatedChart
