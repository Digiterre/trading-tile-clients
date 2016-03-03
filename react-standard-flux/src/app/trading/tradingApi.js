
"use strict";

function TradingApi(endpoint) {
                              
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

            $.post(tradeEndPoint, {
                "symbols": rate.symbols,
                "action": rate.action,
                "spot": (rate.action === "Buy") ? rate.buy : rate.sell,
                "quantity": rate.quantity
            }, callback);
        }                             
}        

module.exports = TradingApi;


    

