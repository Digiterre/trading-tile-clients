'use strict';

var angular = require('angular');
var React = require('react');

var ReactTradingPlate = React.createClass({
	propTypes: {
		action: React.PropTypes.string.isRequired,
		bigFig: React.PropTypes.string.isRequired,
		pips: React.PropTypes.string.isRequired,
		fractionalPips: React.PropTypes.string.isRequired,
		executeTrade: React.PropTypes.func.isRequired
	},
	render: function() {
		var self = this;
		return (
			<div onClick={function() {
				self.props.executeTrade(self.props.action);
			}}>
				<div className="tile__action">
					{this.props.action}
				</div>
				<div className="tile__spotrate">
					<span className="tile__big-fig">
						{this.props.bigFig}
					</span>
					<span className="tile__pips">
						{this.props.pips}
					</span>
					<span className="tile__fractional-pips">
						{this.props.fractionalPips}
					</span>
				</div>
			</div>
		);
	}
});

function reactTradingPlateDirective(reactDirective) {
	return reactDirective(ReactTradingPlate);
}
reactTradingPlateDirective.$inject = ['reactDirective'];

angular
	.module('app.trading')
	.directive('reactTradingPlate', reactTradingPlateDirective);