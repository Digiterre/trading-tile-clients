"use strict";

 
 function modelprovider(hubproxy) {
                   
     var pricingHub;        
     var callbacks = [];        
     var previousRate = null;
     var symbols = "GBP/USD";
     var quantity = "GBP 1,000,000";
                                                                                  
     var service = {
         onModelChanged: onModelChanged
     };
     
     init();
 
     return service;
     
     function init() {            
         pricingHub = hubproxy('pricingHub');
         pricingHub.on('rateChanged', onRateChanged);
         pricingHub.start();            
     }
     
     function onRateChanged(newRate) {
                                                          
         var model = $.extend({}, {
             symbols: symbols,
             quantity: quantity,
             movement: calculateMovement(previousRate || newRate, newRate),
             buyPips: formatPips(newRate.buy),
             sellPips: formatPips(newRate.sell)
         }, newRate);
         
         notifyModelChange(model);
         
         previousRate = newRate;                                    
     }
     
     function calculateMovement(priorRate, newRate)
     {
         var x = newRate.buy - priorRate.buy;            
         switch(true) {
             case x < 0 :
                 return "down";                    
             case x > 0 :
                 return "up";                    
             default :
                 return "none";                                                     
         }
     }
     
     function formatPips(spotRate) {
         
         var str = "" + spotRate;
         var pad = "0000000";
         var ans = str + pad.substring(0, pad.length - str.length);
         
         return {
             bigFig: ans.substring(0, 4),
             pips: ans.substring(4, 6),
             fractionalPips: ans.substring(6, 8)
         };
         
     }
     
     function notifyModelChange(model) {
         callbacks.forEach(function(callback) { callback(model); });
     }
      
     function onModelChanged(callback) {
         callbacks.push(callback);
     }
                         
 }

 module.exports = modelprovider;