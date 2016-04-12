"use strict";

var angular = require('angular');

angular
        .module('app.data')
        .factory('hubproxy', hubproxy);

hubproxy.$inject = ['$rootScope', 'endpoint'];
 
 function hubproxy($rootScope, endpoint) {
                      
     return function(hubName) {
         
         var connection;
         var hubProxy;
         
         var service = {
             on: on,
             start: start
         };
         
         init();
     
         return service;
         
         function init() {
             connection = $.hubConnection(endpoint);
             hubProxy = connection.createHubProxy(hubName);                                                  
         }
         
         function start() {
             connection
                 .start()
                 .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
                 .fail(function(){ console.log('Could not connect'); });
         }
         
         function on(eventName, callback) {
             hubProxy.on(eventName, callback);
         }
         
     };        
 }