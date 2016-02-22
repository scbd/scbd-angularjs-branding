define(['app',
  'text!./xuser-notifications.html','lodash','moment','ionsound',
  'css!./xuser-notifications',
  'scbd-angularjs-filters/schema-name',
  'scbd-angularjs-filters/l-string',
  'scbd-angularjs-services/user-notifications'],
function(app,template,_,moment) {
    app.service("cfgUserNotification", function(){
        var notificationUrls = {
            documentNotificationUrl     : '/register/requests/',
            viewAllNotificationUrl      : '/register/requests',
            documentMessageUrl          : '/mailbox/'
        };

        return {
            notificationUrls : notificationUrls
        };
    });
    app.directive('xuserNotifications', function() {
        return {
            restrict: 'EAC',
            replace: true,
            template: template,
//needed to hide button in drop down but isolete scope make parent directive disapear
// stephane help!!!! why is angular crazy here or more like what am I not seeing?
            // scope: {
            //      hideCloseButton: '@',
            // },
            link: function ($scope, element, attrs){
              if(attrs.hideCloseButton)
                $scope.hideCloseButton=attrs.hideCloseButton;
              else
                $scope.hideCloseButton=0;

            },
            controller: ['$scope', '$rootScope', 'IUserNotifications',
                        '$timeout', '$filter','authentication','cfgUserNotification',
                function($scope, $rootScope, userNotifications, $timeout, $filter,
                        authentication, cfgUserNotification) {


                    var pageNumber = 0;
                    var pageLength = 10;
                    // var canQuery = true;

                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
                    }
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.timePassed = function(createdOn) {
                        var timespan = moment(createdOn);
                        return timespan.startOf('hours').fromNow(true);
                    };
    	           var notificationTimer;
                    //============================================================
                    //
                    //
                    //============================================================
                    getNotification = function() {
                        if ($rootScope.user && $rootScope.user.isAuthenticated) {
                            // if (canQuery) {
                            var queryMyNotifications;
                            queryMyNotifications = {$or:[{'state': 'read'},{'state': 'unread'}]};
                            if ($scope.notifications) {
                                var notification = _.first($scope.notifications);
                                if (notification)
                                    queryMyNotifications = {
                                        $and: [{
                                            "createdOn": {
                                                "$gt": new Date(notification.createdOn).toISOString()
                                            },
                                            $or:[{'state': 'read'},{'state': 'unread'}]
                                        }]
                                    };
                            }
                            //$and: [{"_id": {"$gt": notification._id}}]
                            var continueNotification = true;
                            userNotifications.query(queryMyNotifications, pageNumber, pageLength)
                                .then(function(data) {
                                    if (!data || data.length === 0)
                                        return;
                                    var localNotifications;
                                    if ($scope.notifications) {
                                        localNotifications = _.clone($scope.notifications);
                                        _.each(data, function(message) {
                                            var exists = _.findWhere(localNotifications,{'id':message.id});
                                            if(!exists)
                                                localNotifications.push(message);
                                        });

                                        if(ion && _.some(localNotifications,function(notification){return notification.state == "unread"}))
                                            ion.sound.play("bell_ring");
                                    } else {
                                        localNotifications = data;
                                    }
                                    $scope.notifications = [];
                                    $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                                })
                                .catch(function(error){
                                    if(error.data && error.data.statusCode==401){
                                       // console.log('calling get fetch from notifications' );
                                        //authentication.getUser(true);
                                         continueNotification = false;
                                    }
                                })
                                .finally(function() {
                                    if(continueNotification)
                                        notificationTimer =  $timeout(function() { getNotification();}, 10000);
//                                   notificationTimer.then(function(){
//                                        //console.log('finished with timer');
//                                    }).catch(function(){
//                                        //console.log('rejected timer');
//                                    });
                                });
                            //}
                        }

                    };
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.updateStatus = function(notification) {
                        if (notification && notification.state == 'unread') {
                            userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                .then(function() {
                                    notification.state = 'read';
                                });
                        }
                        if (notification && notification.state == 'read') {
                            userNotifications.update(notification.id, {
                                    'state': 'unread'
                                })
                                .then(function() {
                                    notification.state = 'unread';
                                });
                        }
                    };

                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.markAsRead = function(notification) {
                        if (notification && notification.state =='unread') {
                            userNotifications.update(notification.id, {
                                    'state': 'read'
                                })
                                .then(function() {
                                    notification.state = 'read';
                                });
                        }
                    };
                    //============================================================
                    //
                    //
                    //============================================================
                    $scope.isUnread = function(notification) {

                        return notification && notification.state == 'unread';
                    };

                    $scope.$on('$destroy', function(evt){
                        //console.log('$destroy');
                        $timeout.cancel(notificationTimer);
                    });

//                    $scope.$on('signIn', function(evt,user){
//                        $timeout(function(){
//                            console.log('notification after signin')
//                            getNotification();
//                            },5000);
//                    });
    	           $scope.$on('signOut', function(evt,user){
                             //console.log('notification timer signout')
                       $timeout.cancel(notificationTimer);
                    });
                    getNotification();

                    $rootScope.$watch('user', function(newVla,oldVal){
                        //console.log(newVla,oldVal)
                        if(newVla && newVla!=oldVal){
                            // console.log('user changed');
                            $timeout.cancel(notificationTimer);
                            if(newVla.isAuthenticated)
                                getNotification();
                        }
                    });

                    $scope.getURL = function(notification){
                        //console.log(notification)
                        if(cfgUserNotification.notificationUrls &&
                        !cfgUserNotification.notificationUrls.documentNotificationUrl)
                            throw "Invalid User Notification Configuration, documentNotificationUrl is missing.";

                        if(notification.type=='documentNotification')
                            return cfgUserNotification.notificationUrls.documentNotificationUrl
                                    + notification.data.workflowId;
                        else
                            return cfgUserNotification.notificationUrls.documentMessageUrl + notification.id;
                    }

                    $rootScope.$on('onNotificationStatusChanged', function(evt,data){
                        // console.log('onNotificationStatusChanged',data)
                        var notification = _.first(_.where($scope.notifications, {id:data.id}));

                        if(notification){
                            notification.state = 'read';
                        }

                    });

                    ion.sound({
                        sounds: [
                            {
                                name: "bell_ring"
                            }
                        ],
                        volume: 0.5,
                        path: "/app/libs/ionsound/sounds/",
                        preload: true
                    });

                }
            ]

        };
    });

});
