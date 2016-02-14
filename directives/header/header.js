define(['app',
        'text!./header.html',
        'jquery',
        'css!/app/libs/scbd-branding/css/colors',
        'css!./header',
        'scbd-angularjs-services/authentication',
        './account',
        './locale',
        './accounts-validation',
        './login',
        './xuser-notifications-icon'
    ],
    function(app, template, $) {
        app.directive('scbdHeader', function() {
            return {
                restrict: 'E',
                priority: 10, //parent has 0 priority
                template: template,
                controller: ['$scope', 'authentication',
                    function($scope, authentication) {
                        authentication.getUser().then(function(u) {
                            $scope.user = u;
                            $scope.toggleMenu = 0;

                        });
                    }
                ], //controller
            }; //return
        }); //directive
    });
