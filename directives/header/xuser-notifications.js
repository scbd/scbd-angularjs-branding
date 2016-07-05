define(['app',
  'text!./xuser-notifications.html','lodash','moment',
  'css!./xuser-notifications',
  'scbd-angularjs-filters',
  'scbd-angularjs-services/user-notifications', '../infinite-scroll-directive'],
function(app, template,_,moment) {
     app.service("cfgUserNotification", ['$location', '$window', function($location, $window){
       
        var notificationUrls = {
            documentNotificationUrl     : '/register/requests/',
            viewAllNotificationUrl      : '/register/requests',
            documentMessageUrl          : '/mailbox/'
        };
       var productionRealms = {
            urls : ['https://absch.cbd.int', 'https://chm.cbd.int', 'https://accounts.cbd.int'],
            realms : ['ABS', 'CHM']
        }

        var developmentRealms = {
            urls : ['https://absch.cbddev.xyz', 'https://dev-chm.cbd.int', 'https://chm.cbddev.xyz', 'https://accounts.cbddev.xyz',
                    'http://localhost:2010', 'http://localhost:2000', 'http://localhost:8000'],
            realms : ['ABS-DEV', 'CHM-DEV']
        }

        var trainingRealms = {
            urls : ['https://training-absch.cbd.int'],
            realms : ['ABS-TRG']
        }

        function realmsForQuery(){
            if(_.some(productionRealms.urls, function(url){
                return $location.absUrl().indexOf(url)>=0;
            }))
               return productionRealms.realms;
            
            if(_.some(developmentRealms.urls, function(url){
                return $location.absUrl().indexOf(url)>=0;
            }))
               return developmentRealms.realms;
            
            if(_.some(trainingRealms.urls, function(url){
                return $location.absUrl().indexOf(url)>=0;
            }))
               return trainingRealms.realms;
        }

        function notificationUrl(notification) {
             switch(notification.data.documentInfo.realm.toUpperCase()){
                case 'ABS' :
                    url = 'https://absch.cbd.int';break;
                case 'ABS-DEV' :
                    url = 'https://absch.cbddev.xyz';break;
                case 'ABS-TRG' :
                    url = 'https://training-absch.cbd.int';break;
                case 'CHM' :
                    url = 'https://chm.cbd.int';break;
                case 'CHM-DEV' :
                    url = 'https://dev-chm.cbd.int';break;
            }
            //if same realm url avoid using window redirect
            if($location.absUrl().indexOf(url)>=0 || $location.absUrl().indexOf('http://localhost:')>=0)
                url = '';

            var path;
            if(_.contains(['ABS', 'ABS-DEV', 'ABS-TRG'], notification.data.documentInfo.realm.toUpperCase())){
                path = "/register/" +  $filter("mapSchema")(notification.data.documentInfo.metadata.schema) + "/" + notification.data.documentInfo.identifier + "/view";
            }
            else{
                path = $scope.getURL(notification);
            }

            if(url!= ''){
                $window.location.href = url + path;
            }
            else{
               return path;
            }
        }

        return {
            notificationUrls : notificationUrls,
            realmsForQuery   : realmsForQuery,
            notificationUrl  : notificationUrl
        };
    }]);
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

                    var realmsForQuery = cfgUserNotification.realmsForQuery();
                    
                    $scope.showInView =function(){
                      userNotifications.viewAll=!userNotifications.viewAll;
                    }

                     //============================================================
                    //
                    //
                    //============================================================
                    $scope.goto = function(notification) {
                        if(notification.state==='unread')
                          $scope.updateStatus(notification);

                        var url = ''

                        if(notification.data && notification.data.documentInfo){
                           url = cfgUserNotification.notificationUrl(notification);
                        }
                        else{
                            url = $scope.getURL(notification);
                        }

                        $location.url(url);
                    };

    	           var notificationTimer;
                    //============================================================
                    //
                    //
                    //============================================================
                    getNotification = function(count) {
                        if ($rootScope.user && $rootScope.user.isAuthenticated) {
                            var queryMyNotifications;
                            queryMyNotifications = {
                                                        $and:[{'state': 'unread'}],
                                                        'data.documentInfo.realm' : { $in  : realmsForQuery }
                                                   };
                            
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
                            
                            userNotifications.get(data.data.id)
                            .then(function(notification) {
                                processNotifications([notification]);
                                $scope.notificationCount++;
                                $scope.notificationUnreadCount++;
                                //if(ion)
                                    //ion.sound.play("bell_ring");
                            });
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
                           // if(ion && _.some(localNotifications,function(notification){return notification.state == "unread"}))
                            //     ion.sound.play("bell_ring");
                        }
                        $timeout(function(){
                            $scope.notifications = [];
                            $scope.notifications = $filter("orderBy")(localNotifications, 'createdOn', true);
                        });
                    }

                    // ion.sound({
                    //     sounds: [
                    //         {
                    //             name: "bell_ring"
                    //         }
                    //     ],
                    //     volume: 0.5,
                    //     path: "/app/libs/ionsound/sounds/",
                    //     preload: true
                    // });

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
