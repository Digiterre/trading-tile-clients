"use strict";

var angular = require('angular');
var ngReact = require('ngReact');

require('./core');
require('./data');
require('./trading');

angular.module('app', [
    'app.core',
    'app.data',
    'react',
    // features
    'app.trading'
]);


