define(['app','text!./xuser-notifications-icon.html','css!./xuser-notifications-icon','../../../scbd-angularjs-services/services/user-notifications'], function(app,template) {
    app.directive('xuserNotificationsIcon', function() {
        return {
            restrict: 'E',
            replace: true,
            template: template,

            controller: ['$scope',  'IUserNotifications',
                function($scope,  userNotifications) {
                    $scope.userNotifications=userNotifications;

                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
                    }
                }]};
    });
});
