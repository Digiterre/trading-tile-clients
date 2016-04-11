"use strict";

describe('Controller trading: ', function () {

    beforeEach(module('app'));

    var ctrl;

    beforeEach(inject(function($controller, $rootScope, modelprovider, tradingservice, toastr) {
        var myScope = $rootScope.$new();
        ctrl = $controller('Trading', {
            $scope: myScope,
            modelprovider: modelprovider,
            tradingservice: tradingservice,
            toastr: toastr
        });
    }));

    it('should start in a non executing state', function() {
        expect(ctrl.isExecuting).toEqual(false);
    });

    it('should have defaults set', function() {
        expect(ctrl.symbols).toEqual("GBP/USD");
        expect(ctrl.movement).toEqual("none");
        expect(ctrl.spread).toEqual(1.6);
        expect(ctrl.quantity).toEqual("GBP 1,000,000");
    });


});
