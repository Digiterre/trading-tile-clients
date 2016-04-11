'use strict'; 

var HubProxy = require('../core/hubProxy');
var tradingActions = require('./tradingActions');
var constants = require('../core/constants');

function RateProvider() {
                              
        var pricingHub;

        init();

        /////////////////////
                                                                                                             
        function init() {            
            var hubproxy = new HubProxy(constants.endpoint);
            pricingHub = hubproxy('pricingHub');
            pricingHub.on('rateChanged', onRateChanged);
            pricingHub.start();            
        }
        
        function onRateChanged(updatedRate) {
            tradingActions.changeRate(updatedRate);
        }                
}
        
module.exports = new RateProvider();
