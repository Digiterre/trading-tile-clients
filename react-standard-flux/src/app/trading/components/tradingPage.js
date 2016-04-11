'use strict';

var React = require('react');
var TradingTile = require('./tradingTile');
var TradingNotifier = require('./tradingNotifier');

var TradingPage = React.createClass({
		
	render: function() {

		return (
			<section className="container">
				<TradingTile />
				<TradingNotifier />
			</section>
		);
	}
});

module.exports = TradingPage;