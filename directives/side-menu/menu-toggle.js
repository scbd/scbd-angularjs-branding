
define(['app',
 'text!./menu-toggle.html',
 'lodash',
  'css!./menu-toggle',
  'scbd-angularjs-services/authentication'
],
function(app,template,_) {
        app.directive('menuToggle', ['authentication',function (auth ) {
      return {
          scope: {
            section: '='
          },
          template: template,
          require: ['^scbdSideMenu','^menuToggle'],
          controller: ['$scope','$element',function ($scope,$element) {

              auth.getUser().then(function(user){

                $scope.user = user;
  //              console.log($scope.user);
              });

              // set initial style for link Item
              $element.find('button').addClass($scope.section.config.colorClass);

              $scope.isOpen = function () {
                return $scope.section.open;
              };
              $scope.toggle = function () {

                  $scope.scbdMenuCtrl.closeAllToggles($scope.section.name);
                  $scope.section.open=!$scope.section.open;

              };

              //============================================================
              //
              //
              //============================================================
              $scope.hasRole = function () {
// console.log($scope.section.roles);

                  if(!$scope.section.roles)
                    return true;
                  else if(!$scope.user)
                    return false;
                  else{
                    console.log(_.intersection($scope.section.roles, $scope.user.roles).length>0);
                        return _.intersection($scope.section.roles, $scope.user.roles).length>0;

                  }


              }

          }],//cotrroller
          link: function($scope, $element, $attr, ctrls) {

                $scope.scbdMenuCtrl=ctrls[0];
                $scope.section.self=ctrls[1];
          }//link
      };//return
    }]);//directive
});//define