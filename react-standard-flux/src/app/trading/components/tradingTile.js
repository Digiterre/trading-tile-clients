"use strict";

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
			<section >    
				<div style={{width: '100%'}}>
				<div className="inner">
					
				{this.state.model.isExecuting ? (
					<div className="tradingTile">
						<span className="execute">
							Executing...
						</span>
					</div>
				) : (
					<div className="tradingTile">
						<table style={{width: '100%', height: '100%'}}>
							<tbody>
								<tr>
									<td style={{width: '40%'}} className="symbol">{this.state.model.symbols}</td>
									<td style={{width: '60%'}}></td>
								</tr>
								<tr>
									<td colSpan="2">
										<table style={{width: '100%', 'textAlign': 'center'}}>
											<tbody>
												<tr>
													<TradingPlate 	action= {'SELL'}
																onTrade={this._onTrade}
																bigFig={this.state.model.buyPips.bigFig} 
																pips={this.state.model.buyPips.pips} 
																fractionalPips={this.state.model.buyPips.fractionalPips}/>
													
													<TradingIndicator spread={this.state.model.spread} movement={this.state.model.movement}/>
													<TradingPlate action= {'BUY'} onTrade={this._onTrade} {...this.state.model.sellPips}/>
												</tr>
											</tbody>
										</table>                            
									</td>
								</tr>
							</tbody>
						</table>
						<div className="quantity" style={{'fontSize': '16px', 'textAlign': 'right'}}>{this.state.model.quantity}</div>
					</div>

				)}
									
				</div>
				</div>
			</section>
		);
	}
});

module.exports = TradingTile;