'use strict';

angular.module('casaNodejsApp')
.directive('appGrid', function($templateRequest, $compile) {
    return {
        restrict: 'E',
        scope: {
            apps: '='
        },
        transclude:true,
        link: function(scope, element, attrs) {
            var widthOfApp = 200;
            var columnCount = 4;
            var appContainer = $('<div/>');
            var template;

            function reflow(){
                var parentWidth = element.parent().width();
                var parentPadding = (element.parent().innerWidth() - element.parent().width()) / 2;
                element.html("");
                var columnHeights = [0,0,0,0];
                var currentColumnOffset = 0;
                var currentColumn = 0;
                var row = 0;
                //do the flow!
                
                _.each(scope.apps, function(app, index){
                    var childScope = scope.$new();
                    childScope.app = app;

                    var appDiv = angular.element($compile(template)(childScope));

                    appDiv.addClass("app-box");
                    appDiv.css("left", currentColumnOffset + parentPadding);
                    appDiv.css("top", columnHeights[currentColumn]);
                    appDiv.css("width", parentWidth / columnCount);



                    console.log(appDiv.html());
                    appContainer.append(appDiv);
                    element.append(appContainer);
                    
                    columnHeights[currentColumn] += appDiv.height();
                    console.log('added: ', columnHeights[currentColumn]);
                    currentColumnOffset += parentWidth / columnCount;
                    currentColumn++;
                    if(currentColumnOffset + widthOfApp > parentWidth){
                        currentColumnOffset = 0;
                        row++;
                        currentColumn = 0;
                    }

                });
                
            }

            $templateRequest(attrs.appTemplate)
            .then(function(response){
                template = response;
                reflow();
            });
            
            //$(window).resize(reflow);
            console.log('adding appContainer:', appContainer);
            element.append(appContainer);
        }
    };
});