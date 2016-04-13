"use strict";

var angular = require('angular');

angular.module('app.trading', []);

var modelprovider = require('./modelprovider');
modelprovider.$inject = ['hubproxy'];

angular.module('app.trading').factory('modelprovider', modelprovider);

require('./reactTradingPlateDirective');
require('./tradingPlateDirective');
require('./trading.service');
require('./trading');