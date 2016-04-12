'use strict';

var Dispatcher = require('../core/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./actionTypes');
var CHANGE_EVENT = 'change';
var utils = require('../core/utils');

function TradingStore() {
	
	var previousRate = null;
	var symbols = "GBP/USD";
	var quantity = "GBP 1,000,000";	
	var model = null;

	var self = this;

	var store = {
		getInitialState: getInitialState,
		addChangeListener: addChangeListener,
		removeChangeListener: removeChangeListener
  };

  init();

	return store;

	////////////////////////

	function init() {

		model = {			
				isExecuting: false,
				symbols: 'GBP/USD',
				quantity: "GBP 1,000,000",
				movement: "none",
				spread: 1.6,
				buyPips: {	bigFig: "1.61",
						fractionalPips: "5",
						pips: "49" },
				sellPips: {	bigFig: "1.61",
						fractionalPips: "9",
						pips: "47" }			
		};

		Dispatcher.register(function(action) {
			switch(action.actionType) {
				
				case ActionTypes.RATE_CHANGED:					
					onRateChanged(action.updatedRate);
					break;
				case ActionTypes.TRADE_WILLEXECUTE:
					onTradeWillExecute();
					break;
				case ActionTypes.TRADE_EXECUTED:
					onTradeDidExecute(action.updatedTrade);
					break;
					
				default:
					// no op
			}
		});
  }

  function onTradeDidExecute(updatedTrade) {
		model.isExecuting = false;
  }

  function onTradeWillExecute() {
		model.isExecuting = true;
		self.emit(CHANGE_EVENT, model);
  }

  function onRateChanged(newRate) {
		if (model.isExecuting) {
			return;
		}

		model = $.extend(model, {
			movement: calculateMovement(previousRate || newRate, newRate),
			buyPips: formatPips(newRate.buy),
			sellPips: formatPips(newRate.sell)
		}, newRate);

		previousRate = newRate;

		self.emit(CHANGE_EVENT, model);
  }
	
	function addChangeListener(callback) {
		self.on(CHANGE_EVENT, callback);
	}

	function removeChangeListener(callback) {
		self.removeListener(CHANGE_EVENT, callback);
  }

	function calculateMovement(priorRate, newRate) {
		var x = newRate.buy - priorRate.buy;            
		switch(true) {
			case x < 0 :
				return "down";                    
			case x > 0 :
				return "up";                    
			default :
				return "none";                                                     
		}
	}

	function formatPips(spotRate) {
      var str = "" + spotRate;
      var pad = "0000000";
      var ans = str + pad.substring(0, pad.length - str.length);
      
      return {
          bigFig: ans.substring(0, 4),
          pips: ans.substring(4, 6),
          fractionalPips: ans.substring(6, 8)
      };
  }

  function getInitialState() {
		return model;
	}
}

utils.inherits(TradingStore, EventEmitter);

module.exports = new TradingStore(); 

