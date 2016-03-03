var utils = require('./utils.js');
var toastr = require('toastr');

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-top-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

var TileController = (function () {
        function TileController(model, endpoint) {
            this._model = model;
            this._endpoint = endpoint;
            this._currentViewModel = { isExecuting : false };
        }
        TileController.prototype.init = function () {
                                                
            var self = this;
                        
            this._model.on('rateChanged', self.onModelChanged.bind(self));
            
            $('#btnBuy').click(function() { self.executeTrade('Buy'); });            
            
            $('#btnSell').click(function() { self.executeTrade('Sell'); });
            
            $('#btnBuy').hover(
                function() { $( this ).addClass("hover");}, 
                function() { $( this ).removeClass("hover");}
            );
            
            $('#btnSell').hover(
                function() { $( this ).addClass("hover");}, 
                function() { $( this ).removeClass("hover");}
            );                       
            
            
            $('#executionPad').hide()
            $('#tradingPad').hide()
            
        };
        TileController.prototype.executeTrade = function (action) {
            this._currentViewModel.isExecuting = true;
            var rate = this._currentViewModel;
                                   
            $.post(this._endpoint + "/api/currency/execute", {
                "symbols" : rate.symbols,
                "action" : action,
                "spot" : (action == "Buy") ? rate.buy : rate.sell,
                "quantity" : rate.quantity
            },  function( data ) {                                
                toastr.success(data.action + " " + data.quantity + " @ " + data.spot + " " + data.symbols + " <br/> with id " + data.tradeId);
            });
            
            this._currentViewModel.isExecuting = false;            
        };
        
        TileController.prototype.onModelChanged = function (newRate) {
                                    
            this._currentViewModel = utils.mixin(this._currentViewModel, newRate);
                                    
            var vm = this._currentViewModel;
            
            $('#sellBigFigures').text(vm.sellPips.bigFig);
            $('#sellPips').text(vm.sellPips.pips);
            $('#sellTenthOfPips').text(vm.sellPips.fractionalPips);            
            
            $('#buyBigFigures').text(vm.buyPips.bigFig);
            $('#buyPips').text(vm.buyPips.pips);
            $('#buyTenthOfPips').text(vm.buyPips.fractionalPips);

            $('#spread').text(vm.spread);
            (vm.movement == "up") ? $('.upArrow').show() : $('.upArrow').hide();
            (vm.movement == "down") ? $('.downArrow').show() : $('.downArrow').hide(); 
            
            $('#symbols').text(vm.symbols);
            $('#quantity').text(vm.quantity);           
            
            (vm.isExecuting) ? $('#executionPad').show() : $('#executionPad').hide();
            (vm.isExecuting) ? $('#tradingPad').hide() : $('#tradingPad').show();
                                                 
        };
        
        return TileController;
})();

module.exports = TileController;   
