'use strict';

var React = require('react');
var rateProvider = require('./app/trading/rateProvider');
var TradingPage = require('./app/trading/components/tradingPage');

React.render(<TradingPage/>, document.getElementById('app'));
