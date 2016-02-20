define(['app',
  'text!./account.html',
  'lodash',
  'css!./account',
  'scbd-angularjs-services/authentication',
],
function(app, template,_) {
     app.directive('accountHeader', function() { // parent directive header

         return { restrict: 'E' ,
                  priority: 0, //child of headder
                  template: template,
                  scope: {
                       user: '=',
                  },
                  controller: ['$scope', '$window', '$location','authentication','scbdMenuService',
                  function($scope, $window, $location,authentication,scbdMenuService) {
                    if(!$scope.user || !$scope.user.isAuthenticated )
                      getUser();
                    //==========================
                    //
                    //============================================================
                    function getUser() {
                      return authentication.getUser().then(function(u){
                    		$scope.user = u;
                        scbdMenuService.accMenu[1].pages=[];
                        _.each($scope.user.roles,function(role){
                          $scope.accMenu=scbdMenuService.accMenu;
                          $scope.accMenu[1].pages.push(
                          {
                            name: role,
                            type: 'link',
                            state: 'https://accounts.cbd.int/profile',
                            faIcon: 'fa fa-users',
                            faIconSize: 'fa-lg',
                          });
                          $scope.accMenu[3].state=$scope.actionSignOut;
                			});
                    });
                  }



// $scope.toggleAccountMenu=scbdMenuService.toggle('account-menu',$scope);



                    //==========================
                    //
                    //============================================================
                    $scope.actionSignOut = function() {
                        authentication.signOut().then(function(){getUser();});
                        getUser();
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionSignup = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                        $window.location.href = 'https://accounts.cbd.int/signup?redirect_uri=' + redirect_uri;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionPassword = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                        $window.location.href = 'https://accounts.cbd.int/password?redirect_uri=' + redirect_uri;
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.actionProfile = function() {
                        var redirect_uri = encodeURIComponent($location.protocol() + '://' + $location.host() + ':' + $location.port() + '/');
                        $window.location.href = 'https://accounts.cbd.int/profile?redirect_uri=' + redirect_uri;

                    };
                  }],//controller
        };//return
     });//directive
});
