"use strict";

var angular = require('angular');

angular.module('app.trading', []);

var modelprovider = require('./modelprovider');
modelprovider.$inject = ['hubproxy'];

angular
  .module('app.trading')
  .factory('modelprovider', modelprovider);
  
require('./trading.service');
require('./trading');
require('./tradingPlateDirective');