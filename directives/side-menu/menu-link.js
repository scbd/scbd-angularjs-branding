
define(['app',
  'text!./menu-link.html',
  'lodash',
  'css!./menu-link',
  '../scbd-button',
  './scbd-menu-service'
],
function(app,template,_) {
        app.directive('menuLink', ['$window','$location','$timeout','scbdMenuService',function ($window,$location,$timeout,scbdMenuService) {
            return {
              scope: {
                section: '='
              },
              require:'^menuLink',
              template: template,
              controller: function ($scope,$element ){

                    // set initial style for link Item
                    var colorClass;
                    var activeClass;
                    var iconClass;
                    if($scope.section.isChild){
                      if($scope.section.config.childrenColorClass)
                          colorClass=$scope.section.config.childrenColorClass;
                      else
                          colorClass=$scope.section.config.colorClass;
                      if($scope.section.config.childrenActiveClass)
                          activeClass = $scope.section.config.childrenActiveClass;
                      else
                          activeClass = $scope.section.config.activeClass;
                    }else{
                      colorClass=$scope.section.config.colorClass;
                      activeClass = $scope.section.config.activeClass;
                      iconClass = $scope.section.config.iconClass;
                    }

                    if($scope.section.config.iconClass)
                      iconClass = $scope.section.config.iconClass;



                    $element.find('button').addClass(colorClass);
                    // activate if rout matches this menue's target
                    if(isActivePath()){
                        $scope.section.active=true;
                        $timeout(function(){toggleActive();},200);
                    }
                    //============================================================
                    // returns true if the browser locaiton matches the links target locaiton
                    //============================================================
                    function isActivePath (){
                        return ($scope.section.path===$location.url());
                    }//isActivePath
                    //============================================================
                    //
                    //============================================================
                    $element.on('mouseenter', function() {
                        if(!isActivePath())
                          toggleActive();
                    });
                    //============================================================
                    //
                    //============================================================
                    $element.on('mouseleave', function() {
                        if(!isActivePath())
                          toggleActive();
                    });

                    //============================================================
                    //
                    //============================================================
                    function deactivate(){
                        $element.find('button').removeClass(colorClass);
                        $element.find('button').removeClass(activeClass);
                        $element.find('button').addClass(colorClass);
                        $element.find('i').removeClass(iconClass);
                        $element.find('img').removeClass(iconClass);
                        $scope.section.active=false;
                    }// deactive

                    //============================================================
                    //
                    //============================================================
                    function activate(){
                        $element.find('button').addClass(activeClass);
                        $element.find('i').addClass(iconClass);
                        $element.find('img').addClass(iconClass);
                        $scope.section.active=true;
                    }//activate

                    //============================================================
                    //
                    //============================================================
                    function toggleActive(){
                       if($element.find('button').hasClass(activeClass))
                          deactivate();
                       else
                          activate();
                    }//toggleactivate
                    //============================================================
                    //   go to url, uri or clal function
                    //============================================================
                    $scope.goTo = function (){
                          // if path is a function call it
                          if(isActivePath()){deactivate();activate();return;}
                          scbdMenuService.closeAllActive($scope.section.config.selfMenu);
                          $timeout(function(){activate();},200);
                          if($scope.section.path && _.isFunction($scope.section.path)){
                            $scope.section.path();

                          }
                          // if it is an external uri
                          else if($scope.section.path && _.isString($scope.section.path) && $scope.section.path.indexOf('http')>=0){
                            $window.location.href =$scope.section.path;
                          }
                          else {
                            // if internal to the SPA
                            $location.url($scope.section.path);
                            return;
                          }
                    };

                    //============================================================
                    //
                    //============================================================
                      function getAllSelectors() {
                        var ret = [];
                        for(var i = 0; i < document.styleSheets.length; i++) {
                            var rules = document.styleSheets[i].rules || document.styleSheets[i].cssRules;
                            for(var x in rules) {
                                if(typeof rules[x].selectorText == 'string') ret.push(rules[x].selectorText);
                            }
                        }
                        return ret;
                      }

                      //============================================================
                      //
                      //============================================================
                      function selectorExists(selector) {
                        var selectors = getAllSelectors();
                        for(var i = 0; i < selectors.length; i++) {
                            if(selectors[i] == selector) return true;
                        }
                        return false;
                      }
                    //============================================================
                    //   API
                    //============================================================
                    this.deactivate = deactivate;
                    this.activate = activate;
                    this.isActivePath=isActivePath;
            },
            link:function($scope, $element, $attr, menuLinkCtrl){
                  $scope.section.self=menuLinkCtrl;
            }
            };
        }]);
});