"use strict";

var angular = require('angular');

require('./core');
require('./data');
require('./trading');

angular.module('app', [
        'app.core',
        'app.data',
        
        // features
        'app.trading'
    ]);


