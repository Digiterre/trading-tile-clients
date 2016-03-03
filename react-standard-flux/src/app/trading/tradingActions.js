"use strict";

var constants = require('../core/constants');
var Dispatcher = require('../core/appDispatcher');
var TradingApi = require('./tradingApi');
var ActionTypes = require('./actionTypes');

var api = new TradingApi(constants.endpoint);

var tradingActions = {

	executeTrade: function(trade) {

		Dispatcher.dispatch({
				actionType: ActionTypes.TRADE_WILLEXECUTE
		});			

		api.executeTrade(trade, function(updatedTrade) {

			Dispatcher.dispatch({
				actionType: ActionTypes.TRADE_EXECUTED,
				trade: updatedTrade
			});			
		});
	},

	changeRate: function(updatedRate) {

		Dispatcher.dispatch({
				actionType: ActionTypes.RATE_CHANGED,
				updatedRate: updatedRate
		});
	}
};


module.exports = tradingActions;


