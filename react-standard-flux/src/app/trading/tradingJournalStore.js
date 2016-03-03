"use strict";

var Dispatcher = require('../core/appDispatcher');
var EventEmitter = require('events').EventEmitter;
var ActionTypes = require('./actionTypes');
var CHANGE_EVENT = 'change';
var utils = require('../core/utils');

function TradingJournalStore() {
		
	var self = this;

	var store = {		
		addChangeListener: addChangeListener,
		removeChangeListener: removeChangeListener
         };

         init();

	return store;

	////////////////////////

	function init() {
		
		Dispatcher.register(function(action) {
			switch(action.actionType) {
								
				case ActionTypes.TRADE_EXECUTED:					
					onTradeDidExecute(action.trade);
					break;
					
				default:
					// no op
			}
		});
         }

         function onTradeDidExecute(trade) {         		
		self.emit(CHANGE_EVENT, trade);		
         }

         
	function addChangeListener(callback) {		
		self.on(CHANGE_EVENT, callback);
	}

	function removeChangeListener(callback) {
		self.removeListener(CHANGE_EVENT, callback);	
          }         
   
}       

utils.inherits(TradingJournalStore, EventEmitter);

module.exports = new TradingJournalStore(); 

