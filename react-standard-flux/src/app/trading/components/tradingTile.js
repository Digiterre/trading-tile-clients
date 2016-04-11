'use strict';

var React = require('react');
var ActionTypes = require('../actionTypes');
var tradingStore = require('../tradingStore');
var tradingActions = require('../tradingActions');
var TradingPlate = require('./tradingPlate');
var TradingIndicator = require('./tradingIndicator');


var TradingTile = React.createClass({

	getInitialState: function() {
		return { model: tradingStore.getInitialState() };
	},
	
	componentWillMount: function() {
		tradingStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		tradingStore.removeChangeListener(this._onChange);
	},

	_onChange: function(model) {		
		this.setState({ model: model });
	},

	_onTrade: function (action) {
		var order = $.extend({}, this.state.model, { action: action });
		tradingActions.executeTrade(order);
	},

	render: function() {
		return (
			<div className="tile">
				<nav className="tile__header">
					<div className="tile__currency">
						{this.state.model.symbols}{' '}
						<span className="sprite sprite--direction tile__currency-icon"></span>
					</div>
					<div className="tile__product">
						SP<span className="tile__product-divider">/</span>FW <span className="sprite sprite--dropdown tile__product-icon"></span>
					</div>
					<span className="sprite sprite--close tile__close"></span>
				</nav>
				<div className="tile__body">
					<TradingPlate
						action={'SELL'}
						onTrade={this._onTrade}
						{...this.state.model.buyPips} />
					<div className="tile__spread">
						{this.state.model.spread}
					</div>
					<TradingPlate
						action="Buy"
						onTrade={this._onTrade}
						{...this.state.model.sellPips} />
				</div>
				<div className="tile__footer">
					<div className="tile__quantity">
						<span className="tile__quantity-unit">
							GBP
						</span>
						<span className="tile__quantity-value">
							1,000,000
						</span>
					</div>
					<div className="tile__tenor">
						<span className="tile__tenor-unit">
							SP
						</span>
						{' '}
						<span className="tile__tenor-value">
							11-Jan-2015
						</span>
					</div>
				</div>
				{this.state.model.isExecuting ? (
					<div className="tile__overlay">
						<span className="tile__overlay-text">Executing Trade...</span>
						<div className="spinner">
							<div className="spinner__bounce1"></div>
							<div className="spinner__bounce2"></div>
							<div className="spinner__bounce3"></div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
});

module.exports = TradingTile;