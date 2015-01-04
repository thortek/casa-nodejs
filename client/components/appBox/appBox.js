'use strict';

angular.module('casaNodejsApp')
.directive('appBox', function() {
    return {
        restrict: 'E',
        scope: {
            app: '='
        },
        replace:true,
    };
});