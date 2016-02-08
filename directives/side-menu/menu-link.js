
define(['app',
  'text!./menu-link.html',
  'lodash',
  'css!./menu-link',

],
function(app,template,_) {
        app.directive('menuLink', function ($window) {
            return {
              scope: {
                section: '='
              },
              template: template,
              link: function ($scope ){
              $scope.goTo = function (){
                    if($scope.section.state && _.isFunction($scope.section.state)){
                      $scope.section.state();
                    }
                    else if($scope.section.state && _.isString($scope.section.state)){
                      $window.location.href =$scope.section.state;
                    }
                    else {
                      return;
                    }
              };

              }
            };
        });
});