
define(['app',
  'text!./menu-link.html',
  'lodash',
  'css!./menu-link',

],
function(app,template,_) {
        app.directive('menuLink', ['$window','$location',function ($window,$location) {
            return {
              scope: {
                section: '='
              },
              template: template,
              controller: function ($scope ){
              $scope.goTo = function (){
                    // if path is a function call it
                    if($scope.section.path && _.isFunction($scope.section.path)){
                      $scope.section.path();

                    }
                    // if it is an external uri
                    else if($scope.section.path && _.isString($scope.section.path) && $scope.section.path.indexOf('http')>=0){
                      $window.location.href =$scope.section.path;
                    }
                    else {
                      // if internal to the SPA
                      $location.url($scope.section.path);
                      return;
                    }
              };

              }
            };
        }]);
});