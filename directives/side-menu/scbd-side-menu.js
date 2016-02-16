
define(['app',
 'text!./scbd-side-menu.html',

   'lodash',
     'css!./scbd-side-menu',
  'css!./scbd-side-menu',
  './menu-toggle',
  './menu-link',
  './scbd-menu-service'
],
function(app, template,_,angular) {



//hack for dynamic id on angualr side nav
  app.directive('evalAttrAsExpr', function evalAttrAsExpr() {
      return {
          restrict: 'A',

          controller: function($scope, $element, $attrs) {
              var attrToEval = $attrs.evalAttrAsExpr;
              $attrs[attrToEval] = $element.parent()[0]['attributes'][0].value;
          },
          priority: 9999
      };
  })


     app.directive('scbdSideMenu', function($compile) {
         return { restrict: 'E' ,
                  priority: 0, //parent has 0 priority
                  template: template,
                  scope: {
                       sections: '=',
                  },
                    transclude: true,
                  controller: ['$scope','$element','$mdSidenav', '$mdUtil','$mdMedia','$timeout','$log','$transclude','scbdMenuService',
                  function($scope, $element,$mdSidenav, $mdUtil,$mdMedia,$timeout,$log,$transclude,scbdMenuService) {



                    $element.find('div').append($transclude());

                    $scope.close = function(){

                        scbdMenuService.close($scope.id);
                    };




                      function closeAllToggles(sectionName) {
                        $timeout(function(){
                          _.each($scope.sections,function(section){
                              if(sectionName !== section.name)
                                section.open=0;
                          });
                        });
                      }
                      this.closeAllToggles = closeAllToggles;

                  }],//controller
                  link: function($scope, $element, $attr) {
                      if($attr.color)
                        $scope.color=$attr.color;
                      else
                        $scope.color='#ffffff';

                      if($attr.backGround)
                        $scope.backGround=$attr.backGround;
                      else
                        $scope.backGround='#009b48';

                      if($attr.toggleColor)
                        $scope.toggleColor=$attr.toggleColor;
                      else
                        $scope.toggleColor='#ffffff';

                      if($attr.toggleBackGround)
                        $scope.toggleBackGround=$attr.toggleBackGround;
                      else
                        $scope.toggleBackGround='#009b48';

                      if($attr.linkColor)
                        $scope.linkColor=$attr.linkColor;
                      else
                        $scope.linkColor='#323232';

                      if($attr.linkBackGround)
                        $scope.linkBackGround=$attr.linkBackGround;
                      else
                        $scope.linkBackGround='#ffffff';

                      if($attr.closeBtnColor)
                        $scope.closeBtnColor=$attr.closeBtnColor;
                      else
                        $scope.closeBtnColor='#ffffff';

                        if($attr.side && $attr.side==='right')
                          $scope.side='md-sidenav-right';
                        else
                          $scope.side='md-sidenav-left';
                      $scope.id=$attr.id;
                  }
        };//return
     });//directive
});
