
define(['app',
 'text!./menu-toggle.html',
  'css!./menu-toggle',
],
function(app,template) {
        app.directive('menuToggle', [function ( ) {
      return {
          scope: {
            section: '='
          },
          template: template,
          require: ['^scbdSideMenu','^menuToggle'],
          controller: ['$scope','$element',function ($scope,$element) {
            $scope.iconToggle={};
              // set initial style for link Item
              $element.find('button').addClass($scope.section.config.colorClass);

              $scope.isOpen = function () {
                return $scope.section.open;
              };
              $scope.toggle = function () {

                  $scope.scbdMenuCtrl.closeAllToggles($scope.section.name);
                  $scope.section.open=!$scope.section.open;

              };

          }],//cotrroller
          link: function($scope, $element, $attr, ctrls) {

                $scope.scbdMenuCtrl=ctrls[0];
                $scope.section.self=ctrls[1];
          }//link
      };//return
    }]);//directive
});//define