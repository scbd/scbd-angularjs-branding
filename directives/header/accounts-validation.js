define(['app',
  'text!./accounts-validation.html',

  'css!./accounts-validation',
  '../../../scbd-angularjs-services/services/authentication',
],
function(app, template) {
     app.directive('accountsValidationHeader', function() {
         return { restrict: 'E' ,
                  scope: {
                       ngModel: '=',
                     },
                  template: template,
                  controller: ['$scope', '$window', '$location','authentication',
                  function($scope, $window, $location,authentication) {
                    if(authentication.isEmailVerified())
                      $scope.showEmailVerificationMessage = 'Email verification pending. Please verify you email before submitting any data.';
                    else
                      $scope.showEmailVerificationMessage = 0;


                      $scope.showMessage = function (){
                        if($scope.showEmailVerificationMessage)
                          return true;
                        else
                          return false;
                      };

                      $scope.showMessageToggle = function (){
                        $scope.showEmailVerificationMessage=!$scope.showEmailVerificationMessage;
                      };
                  }],//controller
        };//return
     });//directive
});