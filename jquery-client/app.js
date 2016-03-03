var TileController = require('./controller.js')
var TileModel = require('./model.js')

$(document).ready(function() {

    var model = new TileModel();

    var controller = new TileController(model, "http://tradingtileserver.azurewebsites.net");
    controller.init();

    var connection = $.hubConnection("http://tradingtileserver.azurewebsites.net");
    var hubProxy = connection.createHubProxy('pricingHub');
    hubProxy.on('ping', function() { console.log('pong');});
    hubProxy.on('rateChanged', model.rateChanged.bind(model));
    connection.start()
        .done(function(){ console.log('Now connected, connection ID=' + connection.id); })
        .fail(function(){ console.log('Could not connect'); });
});
