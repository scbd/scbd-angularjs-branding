define(['app',
    'text!./scbd-side-menu.html',
    'lodash',
    'css!./scbd-side-menu',
    './menu-toggle',
    './menu-link',
    './scbd-menu-service'
  ],
  function(app, template, _) {
    //============================================================
    //  angualr implimentation of Pushy - v0.9.2 - 2014-9-13
    //  github.com/christophery/pushy
    //============================================================
    app.directive('scbdSideMenu',['scbdMenuService','$document', function(scbdMenuService,$document) {
      return {
        restrict: 'E',
        priority: 0, //parent has 0 priority
        template: template,
        scope: {
          sections: '=',
          isOpen: '=',
        },
        require:'^scbdSideMenu',
        transclude: true,
        //============================================================
        //
        //
        //============================================================
        link: function($scope, $element, $attr,scbdSideMenu) {

          if($attr.fullScreen){
              $scope.fullScreen = $attr.fullScreen;
              $element.find('.pushy').css('position','absolute');
            }



          if ($attr.color){
            $scope.color = $attr.color;
            $element.find('.pushy').css('color',$attr.color);
          }
          else{
            $scope.color = '#ffffff';
            $element.find('.pushy').css('color',$attr.color);
          }

          if ($attr.backGround){
            $scope.backGround = $attr.backGround;
            $element.find('.pushy').css('background-color',$attr.backGround);
          }
          else{
            $scope.backGround = '#009b48';
            $element.find('.pushy').css('background-color',$attr.backGround);
          }

          if ($attr.toggleColor)
            $scope.toggleColor = $attr.toggleColor;
          else
            $scope.toggleColor = '#ffffff';

          if ($attr.toggleBackGround)
            $scope.toggleBackGround = $attr.toggleBackGround;
          else
            $scope.toggleBackGround = '#009b48';

          if ($attr.linkColor)
            $scope.linkColor = $attr.linkColor;
          else
            $scope.linkColor = '#323232';

          if ($attr.linkBackGround)
            $scope.linkBackGround = $attr.linkBackGround;
          else
            $scope.linkBackGround = '#ffffff';

          if ($attr.closeBtnColor)
            $scope.closeBtnColor = $attr.closeBtnColor;
          else
            $scope.closeBtnColor = '#ffffff';

          if ($attr.side && $attr.side === 'right')
            $scope.side = 'md-sidenav-right';
          else
            $scope.side = 'md-sidenav-left';

          if ($attr.childrenColor)
            $scope.childrenColor = $attr.childrenColor;
          else {
            $scope.childrenColor = '#000000';
          }
          if ($attr.childrenBackGround)
            $scope.childrenBackGround = $attr.childrenBackGround;
          else {
            $scope.childrenBackGround = '#ffffff';
          }

          // if($attr.mDiSLockedOpen && $attr.mDiSLockedOpen==='gt-md')
          //   $scope.mDiSLockedOpen="true";
          //   $element.find('md-sidenav').attr('md-is-locked-open', 'true');

          if($attr.id){
            scbdMenuService.registerNavInstance($attr.id,scbdSideMenu);
            $scope.id = $attr.id;
          }
        },






        controller: ['$scope', '$element',  '$timeout', '$log', '$transclude','$window',
          function($scope, $element, $timeout, $log, $transclude,$window) {
console.log($scope.sections);
            var pushy = $element.find('.pushy'), //menu css class
            		body = angular.element($document[0].body),
            		container = angular.element($document[0].body).find('#getBumped'), //container css class
            		push = $element.find('.push'), //css class to add pushy capability
            		siteOverlay = $element.find('.site-overlay'), //site overlay
            		pushyClass = "pushy-left pushy-open", //menu position & menu open class
            		pushyActiveClass = "pushy-active", //css class to toggle site overlay
            		containerClass = "container-push", //container open class
            		pushClass = "push-push", //css class to add pushy capability
            		menuBtn = $('.menu-btn, .pushy a'), //css classes to toggle the menu
            		menuSpeed = 200, //jQuery fallback menu speed
            		menuWidth = pushy.width() + "px"; //jQuery fallback menu width

            //============================================================
            //  inseart transclude header
            //============================================================
            $element.find('section').append($transclude());
              $scope.close = function() {
              scbdMenuService.close($scope.id);
            };

//pushy.css('right',0);
// container.toggleClass(containerClass);

pushy.toggleClass(pushyClass);
pushContainerRight();

            //============================================================
            //  toggle
            //============================================================
            function togglePushy(){

          		body.toggleClass(pushyActiveClass); //toggle site overlay
          		pushy.toggleClass(pushyClass);
          		container.toggleClass(containerClass);
          		push.toggleClass(pushClass); //css class to add pushy capability
          	}

            //============================================================
            //  toggle
            //============================================================
            function pushContainerRight(){
          		container.css('-webkit-transform','translate3d(240px,0,0)');
            	container.css('-moz-transform','translate3d(240px,0,0)');
              container.css('-ms-transform','translate3d(240px,0,0)');
              container.css('-o-transform','translate3d(240px,0,0)');
              container.css('transform','translate3d(240px,0,0)');
              if(!screen.width)
                container.css('width',String(($window.innerWidth-278))+'px');
              else
                container.css('width',String((screen.width-278))+'px');
          	}



            //============================================================
            //  open fall back
            //============================================================
            function openPushyFallback(){
          		body.addClass(pushyActiveClass);
          		pushy.animate({left: "0px"}, menuSpeed);
          		container.animate({left: menuWidth}, menuSpeed);
          		push.animate({left: menuWidth}, menuSpeed); //css class to add pushy capability
          	}

            //============================================================
            //  open fall back
            //============================================================
            function closePushyFallback(){
          		body.removeClass(pushyActiveClass);
          		pushy.animate({left: "-" + menuWidth}, menuSpeed);
          		container.animate({left: "0px"}, menuSpeed);
          		push.animate({left: "0px"}, menuSpeed); //css class to add pushy capability
          	}


            //============================================================
            //
            //============================================================
            function closeAllToggles(sectionName) {
              $timeout(function() {
                _.each($scope.sections, function(section) {
                  if (sectionName !== section.name)
                    section.open = 0;
                });
              });
            } // closeAllToggles

            //============================================================
            //
            //============================================================
            function getId() {

                  return $scope.id;
            } // closeAllToggles

            //============================================================
            //   API
            //============================================================
            $scope.toggle=togglePushy;
            this.closeAllToggles = closeAllToggles;
            this.toggle=togglePushy;
            this.getId=getId;
          }
        ], //controller


      }; //return
    }]); //directive
  });