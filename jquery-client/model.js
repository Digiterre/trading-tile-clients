
var utils = require('./utils.js');
var EventEmitter = require('node-event-emitter');

var TileModel = (function () {

        function TileModel() {

            this._symbols = "GBP/USD";
            this._quantity = "GBP 1,000,000";
            this._previousRate = null;
            this._movement = "";
            EventEmitter.call(this);
        }
        utils.inherits(TileModel, EventEmitter);

        TileModel.prototype.rateChanged = function (newRate) {

            this._movement = this.calculateMovement(newRate)

            var model = utils.mixin({
                symbols : this._symbols,
                quantity : this._quantity,
                movement : this._movement,
                buyPips : this.formatPips(newRate.buy),
                sellPips : this.formatPips(newRate.sell),
            }, newRate);

            this.emit('rateChanged', model);

            this._previousRate = newRate;
            console.log(newRate);       
        };

        TileModel.prototype.formatPips = function (rate) {
            var str = "" + rate;
            var pad = "0000000"
            var ans = str + pad.substring(0, pad.length - str.length)

            return {
                bigFig : ans.substring(0, 4),
                pips : ans.substring(4, 6),
                fractionalPips : ans.substring(6, 8)
            };
        };

        TileModel.prototype.calculateMovement = function (newRate) {
            this._previousRate = this._previousRate || newRate;
            var x = newRate.buy - this._previousRate.buy;
            switch(true) {
                case x < 0 :
                    return "down";
                case x > 0 :
                    return "up";
                default :
                    return "none";
            }
        };

        return TileModel;
})();

module.exports = TileModel;
