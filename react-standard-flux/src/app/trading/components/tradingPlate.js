'use strict';

var React = require('react');

var TradingPlate = React.createClass({

	propTypes: {
		action: React.PropTypes.string.isRequired,
		onTrade: React.PropTypes.func.isRequired,
		bigFig: React.PropTypes.string.isRequired,
		pips: React.PropTypes.string.isRequired,
		fractionalPips: React.PropTypes.string.isRequired
	},

	_onTrade: function (event) { 
		this.props.onTrade(this.props.action);		
	},
	
	render: function() {
		return (
			<div className="tile__plate" onClick={this._onTrade}>
				<div className="tile__action">
					{this.props.action} {/* TODO: add GBP */}
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

module.exports = TradingPlate;