define(['app','ionsound',
  'text!./xuser-notifications.html','lodash','moment',
  'css!./xuser-notifications',
  'scbd-angularjs-filters/schema-name',
  'scbd-angularjs-filters/l-string',
  'scbd-angularjs-services/user-notifications', '../infinite-scroll-directive'],
function(app, iosound,template,_,moment) {
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
                        '$timeout', '$filter','authentication','cfgUserNotification','$location',
                function($scope, $rootScope, userNotifications, $timeout, $filter,
                        authentication, cfgUserNotification, $location) {

                    $scope.loading = false;
                    var pageNumber = 0;
                    var pageLength = 30;

                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
                    }

                     //============================================================
                    //
                    //
                    //============================================================
                    $scope.goto = function(notification) {
                        $scope.updateStatus(notification);
                        var url = "/register/" +  $filter("mapSchema")(notification.data.documentInfo.metadata.schema) + "/" + notification.data.documentInfo.identifier + "/view";
                        $location.url(url);
                    };

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
                    getNotification = function(count) {
                        if ($rootScope.user && $rootScope.user.isAuthenticated) {
                            var queryMyNotifications;
                            queryMyNotifications = {$and:[{'state': 'unread'}]};

                            userNotifications.query(queryMyNotifications, pageNumber, pageLength, count)
                                .then(function(data) {

                                    if(count){
                                        $scope.notificationCount = data.count;
                                        $scope.notificationUnreadCount = data.count;
                                    }
                                    else {
                                        if (!data || data.length === 0)
                                            return;
                                        processNotifications(data);
                                    }
                                })
                                .catch(function(error){
                                    if(error.data && error.data.statusCode==401){
                                       // console.log('calling get fetch from notifications' );
                                        //authentication.getUser(true);
                                         continueNotification = false;
                                    }
                                })
                                .finally(function(){
                                    $scope.loading = false;
                                });
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

                    $rootScope.$watch('user', function(newVla,oldVal){
                        //console.log(newVla,oldVal)
                        if(newVla && !angular.equals(newVla, oldVal)){
                            if(newVla.isAuthenticated){
                                getNotification(1);//notification count;
                                getNotification();
                            }
                        }
                    });

                    $rootScope.$on('event:server-pushNotification', function(evt,data){
                        if(data.type == 'userNotification'){
                            processNotifications([data.data]);
                            $scope.notificationCount++;
                            $scope.notificationUnreadCount++;
                            if(ion)
                                ion.sound.play("bell_ring");
                        }
                        else if(data.type == 'notificationStatus'){
                            var notification = _.findWhere($scope.notifications, {id: data.data.id});
                            if(notification){
                                 $timeout(function(){
                                     notification.state = data.data.state;
                                 });
                            }
                             else{
                                 userNotifications.get(data.data.id)
                                 .then(function(data) {
                                     processNotifications([data]);
                                 });
                             }
                         if(data.data.state == 'read')
                            $scope.notificationUnreadCount--;
                         else if(data.data.state == 'unread')
                            $scope.notificationUnreadCount++;

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

                    function processNotifications(data){
                        var localNotifications;
                        if ($scope.notifications) {
                            localNotifications = _.clone($scope.notifications);
                            _.each(data, function(message) {
                                var exists = _.findWhere(localNotifications,{'id':message.id});
                                if(!exists)
                                    localNotifications.push(message);
                            });

                        } else {
                            localNotifications = data;
                            if(ion && _.some(localNotifications,function(notification){return notification.state == "unread"}))
                                ion.sound.play("bell_ring");
                        }
                        $timeout(function(){
                            $scope.notifications = [];
                            $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                        });
                    }

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

                    $scope.loadNotifications = function(){
                        // console.log('load Notification')
                        if(!$scope.enableInfiniteScroll || $scope.loading || $scope.notificationCount <= pageNumber + pageLength)
                            return;
                        $scope.loading = true;

                         pageNumber = pageNumber + pageLength;
                         getNotification();
                    }


                }
            ]

        };
    });

});
