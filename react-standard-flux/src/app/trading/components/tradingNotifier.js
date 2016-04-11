'use strict';

var React = require('react');
var ActionTypes = require('../actionTypes');
var tradingJournalStore = require('../tradingJournalStore');
var tradingActions = require('../tradingActions');
var toastr = require('toastr');

var TradingNotifier = React.createClass({
	
	componentWillMount: function() {
		tradingJournalStore.addChangeListener(this._onChange);
	},
	
	componentWillUnmount: function() {
		tradingJournalStore.removeChangeListener(this._onChange);
	},

	_onChange: function(trade) {		
		toastr.success(trade.action + " " + trade.quantity + " @ " + trade.spot + " " + trade.symbols + " <br/> with id " + trade.tradeId);		
	},

	
	render: function() {

		return (
			<section ></section>
		);
	}
});

module.exports = TradingNotifier;