
module.exports = (function() {

    'use strict';

    function HubProxy(endpoint) {
                             
        return function(hubName) {
            
            var connection;
            var hubProxy;
            
            var service = {
                on: on,
                start: start
            };
            
            init();
        
            return service;

            ////////////////////
            
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

    return HubProxy;
        
})();



