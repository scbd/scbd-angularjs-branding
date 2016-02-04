
define(['app',
 'text!./header.html',
  'jquery',
  'css!/app/libs/scbd-angularjs-branding/css/colors',
  'css!./header',
  'css!font-awsome-css',
  'css!../../../angular-material/angular-material.min',
  '../../../scbd-angularjs-services/services/authentication',
  './account',
  './locale',
  './accounts-validation',
  './login',
  './xuser-notifications',
  './xuser-notifications-icon',
  '../../../scbd-angularjs-services/services/user-notifications'
],
function(app, template, $) {
     app.directive('scbdHeader', function() {
         return { restrict: 'E' ,
                  priority: 10, //parent has 0 priority
                  template: template,

                  controller: ['$scope','$element', '$attrs','$window', '$location','authentication','IUserNotifications',
                  function($scope, $element, $attrs,$window, $location,authentication,userNotifications) {
                      authentication.getUser().then(function(u){
                    	     $scope.user = u;
                           $scope.toggleMenu=0;
                           $scope.userNotifications=userNotifications;

                			});
                  }],//controller
        };//return
     });//directive
});