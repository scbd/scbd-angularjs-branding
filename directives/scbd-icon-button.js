
define(['app',
  'css!./scbd-button',
  './waves'
],
function(app) {

    app.directive('scbdIconButton', ['$timeout','wavesService', function ($timeout,wavesService ) {
            return {
              restrict: 'E',
              replace: true,
              transclude: true,
      //type from to to-type
              template: '<i class="btn-icon" ></i>',
              link:function ($scope, $element, $attr) {
                  wavesService.init();
                  wavesService.attach($element, ['waves-effect','waves-circle']);

                }//link
            };//return
    }]);//directive

});//define