"use strict";

var angular = require('angular');

angular
        .module('app.trading')
        .factory('tradingservice', tradingservice);

 tradingservice.$inject = [
     '$http', 'endpoint'
 ];
 
 function tradingservice($http, endpoint) {
                           
     var tradeEndPoint;             
                                                                                          
     var service = {
         executeTrade: executeTrade
     };
     
     init();
 
     return service;
     
     function init() {            
         tradeEndPoint = endpoint + "/api/currency/execute";                   
     }
      
     function executeTrade(rate, callback) {
                                 
         $http.post(tradeEndPoint, {
             "symbols": rate.symbols,
             "action": rate.action,
             "spot": (rate.action === "Buy") ? rate.buy : rate.sell,
             "quantity": rate.quantity
         }).then(callback);            
     }                             
 }