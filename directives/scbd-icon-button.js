
define(['app',
  'iconate',
  'lodash',
  'css!./scbd-icon-button',
  'css!iconateCSS',

  './waves'
],
function(app,  iconate,_) {

    app.directive('scbdIconButton', ['$timeout','wavesService','$document', function ($timeout,wavesService,$document) {
            return {
              restrict: 'E',
              replace: true,
              transclude: true,
      //type from to to
      scope:{active:'='},
              template: '<i  ng-cloak>{{iconName}}<ng-transclude></ng-transclude></i>',
              link:function ($scope, $element, $attr) {

                var iconName;
                var toIconName;
                var options; // inimation-transform options

                //$element.addClass('btn-icon');
                if($attr.hasOwnProperty('waves') && $attr.waves!=='false' && $attr.waves!=='0'){
                  wavesService.init();
                  wavesService.attach($element, ['waves-effect','waves-circle']);//,'waves-circle'
                }
                if($attr.hasOwnProperty('wavesLight') && $attr.waves!=='false' && $attr.waves!=='0'){
                  wavesService.init();
                  wavesService.attach($element, ['waves-effect','waves-circle','waves-light']);//,'waves-circle'
                }

                if($attr.type === 'fa'){
                  $element.addClass('fa');
                  $element.addClass($attr.iconName);
                }else if($attr.type === 'md'){
                  $element.addClass('material-icons');
                  $scope.iconName=$attr.iconName;
                }

                if($attr.hasOwnProperty('badge')){
                      if($attr.type === 'fa')
                        $element.addClass('fa-badge fa-badge--overlap');
                      else if($attr.type === 'md')
                        $element.addClass('md-badge md-badge--overlap');
                }


                if($attr.ani  && $attr.type === 'fa'){
                      transformInit();
                }

                  //============================================================
                  //
                  //============================================================
                  function transformInit() {
                        iconName = _.clone($attr.iconName);
                        toIconName = _.clone($attr.toIconName);


                        $scope.toggle = function (){

                            if($scope.active)
                                transformBack();
                            else
                                transform();


                        };
                        $timeout(function(){
                            $scope.$watch('active',function(newValue, oldValue) {
                              if (newValue !== oldValue)
                                $scope.toggle();}
                            );
                        },2000);
                        if($scope.active){
                          $scope.toggle();
                        }
                  }//transfor

                  //============================================================
                  //
                  //============================================================
                  function transform() {
                      options = {
                          from: iconName,
                          to: toIconName,//toIconName,
                          animation: $attr.ani
                      };
                      iconate($element[0], options);
                  }//transform

                  //============================================================
                  //
                  //============================================================
                  function transformBack() {
                      options = {
                          from: toIconName,
                          to: iconName,//toIconName,
                          animation: $attr.ani
                      };
                      iconate($element[0], options);
                  }//transform

                  //============================================================
                  //
                  //============================================================
                  function addCSSRule(sheet, selector, rules, index) {
                  	if("insertRule" in sheet) {
                  		sheet.insertRule(selector + "{" + rules + "}", index);
                  	}
                  	else if("addRule" in sheet) {
                  		sheet.addRule(selector, rules, index);
                  	}
                  }

                }//link
            };//return
    }]);//directive

});//define