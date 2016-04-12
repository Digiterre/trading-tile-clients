'use strict';

var angular = require('angular');
angular.module('app.trading').directive('tradingPlate', function() {
  return {
    restrict: 'E',
    scope: {
      action: '=',
      bigFig: '=',
      pips: '=',
      fractionalPips: '=',
      executeTrade: '='
    },
    templateUrl: 'app/trading/tradingPlateDirective.html'
  };
});