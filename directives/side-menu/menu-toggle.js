
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
        require: '^scbd-side-menu',
        controller: ['$scope',function ($scope) {
          //var controller = element.parent().controller();




          $scope.isOpen = function () {

            return $scope.section.open;

          };
          $scope.toggle = function () {

              $scope.scbdMenuCtrl.closeAllToggles($scope.section.name);
              $scope.section.open=!$scope.section.open;

          };

        }],
      link: function($scope, $element, $attr, scbdMenuCtrl) {
          $scope.scbdMenuCtrl = scbdMenuCtrl;
          $scope.color=$attr.color;
          $scope.backGround=$attr.backGround;
          if($attr.childrenColor)
            $scope.childrenColor=$attr.childrenColor;
            if($attr.childrenBackGround)
              $scope.childrenBackGround=$attr.childrenBackGround;

      }
      };
    }]);
});