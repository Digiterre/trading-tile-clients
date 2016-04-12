'use strict';

import 'ms-signalr-client';

module.exports = (function() {

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

    return new HubProxy(process.env.API_ENDPOINT); // eslint-disable-line
})();
