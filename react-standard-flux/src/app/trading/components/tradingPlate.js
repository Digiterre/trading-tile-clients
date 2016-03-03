"use strict";

var React = require('react');

var TradingPlate = React.createClass({

	propTypes: {
			action: React.PropTypes.string.isRequired,
			onTrade: React.PropTypes.func.isRequired,
			bigFig: React.PropTypes.string.isRequired,
			pips: React.PropTypes.string.isRequired,
			fractionalPips: React.PropTypes.string.isRequired
	},

	getInitialState: function() {
		return { tradeIntent: false };
	},

	_onWillTrade: function(model) {
		this.setState({ tradeIntent: true });
	},

	_onWontTrade: function(model) {
		this.setState({ tradeIntent: false });
	},

	_onTrade: function (event) { 
		this.props.onTrade(this.props.action);		
	},
	
	render: function() {

		var classes = this.state.tradeIntent ? 'hover' : null;

		return (
			<td style={{width: '40%'}} className={classes} onMouseEnter={this._onWillTrade} onMouseLeave={this._onWontTrade} onClick={this._onTrade}>
				<div>
					<table>
						<tbody>
						<tr>
							<td className="lowlight" style={{fontSize: '16px'}}>{this.props.action}</td>
						</tr>
						<tr>
							<td style={{width: '100%'}}>
								<span className="lowlight" style={{fontSize: '18px'}}>{this.props.bigFig}</span>
								<span className="highlight pips">{this.props.pips}</span>
								<span className="lowlight" style={{fontSize: '18px'}}>{this.props.fractionalPips}</span>
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			</td>
		);
	}
});

module.exports = TradingPlate;