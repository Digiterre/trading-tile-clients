"use strict";

var angular = require('angular');

angular
        .module('app.trading')
        .controller('Trading', Trading);
    
Trading.$inject = ['$scope', 'modelprovider', 'tradingservice', 'toastr'];
        
function Trading($scope, modelprovider, tradingservice, toastr) {
            
    var vm = this;
                    
    vm.executeTrade = executeTrade;
    
    vm.isExecuting = false;
    vm.symbols = "GBP/USD";
    vm.quantity = "GBP 1,000,000";
    vm.movement = "none";
    vm.spread = 1.6;
    vm.buyPips = { "bigFig": "1.61",
                    "fractionalPips": "5",
                    "pips": "49" };
    vm.sellPips = { "bigFig": "1.61",
                    "fractionalPips": "9",
                    "pips": "47" };
                              
    //////////////////////////                                  
                                                                 
    function executeTrade(action) {
        vm.isExecuting = true;
                    
        var order = $.extend({}, vm, { action: action });
                    
        tradingservice.executeTrade(order, function(resp) {
            
            vm.isExecuting = false;
            
            informTrader(resp.data);                                    

            throw new Error();
        });            
    }
    
    function informTrader(tradeData) {
        toastr.success(tradeData.action + " " + tradeData.quantity + " @ " + tradeData.spot + " " + tradeData.symbols + " <br/> with id " + tradeData.tradeId);
    }                        
                            
    modelprovider.onModelChanged( function(data) {
        
        $.extend(vm, data);
        $scope.$apply();
    });                
}
