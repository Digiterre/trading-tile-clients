"use strict";

var angular = require('angular');
var toastr = require('toastr');

angular
        .module('app.core')
        .constant('toastr', toastr)
        .constant('endpoint', 'http://tradingtileserver.azurewebsites.net');
