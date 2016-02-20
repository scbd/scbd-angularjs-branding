define(['app','lodash'],function(app,_) {


'use strict';


  app.factory('scbdMenuService', [
      '$location','$timeout','$q',

      function ($location,$timeout,$q) {
        var navRegistry={};

        var menus={};

        menus.dashboard= [];
        menus.dashboard.push({
          type: 'config',
          colorClass: 'dash-menu-color',
          activeClass: 'dash-menu-active',
          iconClass: 'pulse',
          selfMenu:menus.dashboard,
          childrenColorClass: 'dash-menu-children-color',
          childrenActiveClass: 'dash-menu-children-active'
        });
        menus.dashboard.push({
          name: 'Dashboard',
          type: 'link',
          mdIcon: 'dashboard',
          path: '/manage',

        });
        menus.dashboard.push({
          name: 'Your Events',
          type: 'link',
          mdIcon: 'event',
          path: '#',
        });
        menus.dashboard.push({
          name: 'Your Organizations',
          type: 'link',
          mdIcon: 'business',
          path: '#',
        });
        // menus.dashboard.push({
        //   name: 'heading',
        //   type: 'heading',
        //
        //
        // });
        menus.dashboard.push({
          name: 'Administration',
          type: 'toggle',
          open:1,
          mdIcon: 'supervisor_account',
          pages: [
            {
              name: 'Events',
              type: 'link',
              path: '/manage/events',
              mdIcon: 'event',
            },
            {
              name: 'Organizations',
              type: 'link',
              path: '/manage/organizations',
              mdIcon: 'business',
            },
            {
            name: 'Meetings',
            type: 'link',
            path: '/manage/meetings',
            mdIcon: 'nature_people',

          }, {
            name: 'Plevra Configuration',
            path: '/manage/config',
            type: 'link',
            imgSrc: '/app/images/cbd-leaf-green.svg',
          },
          {
            name: 'User Management',
            path: 'https://www.cbd.int/convention/parties/list/',
            type: 'link',
            faIcon: 'fa fa-users',
            faIconSize: 'fa-lg',
          }],
        });



        menus.localeMenu= [];
        menus.localeMenu.push({
          name: 'لعربية',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        menus.localeMenu.push({
          name: '中文',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        menus.localeMenu.push({
          name: 'English',
          type: 'link',
          mdIcon: 'language',

        });
        menus.localeMenu.push({
          name: 'Español',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        menus.localeMenu.push({
          name: 'Français',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        menus.localeMenu.push({
          name: 'Русский',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });

        menus.accMenu= [];
        menus.accMenu.push({
          name: 'Your Profile',
          type: 'link',
          mdIcon: 'person',
          state:'https://accounts.cbd.int/profile'
        });

        menus.accMenu.push({
          name: 'Roles',
          type: 'toggle',
          faIcon: 'fa fa-users',
          faIconSize: 'fa-lg',
          pages: [{
            name: 'Text of the Convention',
            type: 'link',
            state: 'https://www.cbd.int/convention/text/',
            faIcon: 'fa fa-users',
            faIconSize: 'fa-lg',
          }, {
            name: 'List of Parties',
            state: 'https://www.cbd.int/convention/parties/list/',
            type: 'link',
            mdIcon: 'nature_people',
          }
        ]});
        menus.accMenu.push({
          name: 'Password',
          type: 'link',
          faIcon: 'fa fa-key',
          faIconSize: 'fa-lg',
          state:'https://accounts.cbd.int/password'
        });
        menus.accMenu.push({
          name: 'Sign-out',
          type: 'link',
          faIcon: 'fa fa-sign-out',
          faIconSize: 'fa-lg',
          //state:'signOut'
        });

        menus.cbdMenu= [];

        menus.cbdMenu.push({
          name: 'The Convention',
          type: 'toggle',
          imgSrc: '/app/images/cbd-leaf-white.svg',
          pages: [{
            name: 'Text of the Convention',
            type: 'link',
            state: 'https://www.cbd.int/convention/text/',
            faIcon: 'fa fa-gavel',
            faIconSize: 'fa-lg'
          }, {
            name: 'List of Parties',
            state: 'https://www.cbd.int/convention/parties/list/',
            type: 'link',
            mdIcon: 'nature_people',
          },
            {
              name: 'Strategic Plan',
              state: 'https://www.cbd.int/sp/',
              type: 'link',
              mdIcon: 'directions_run',
            },
            {
              name: 'Programmes and Issues',
              state: 'https://www.cbd.int/programmes/',
              type: 'link',
              faIcon: 'fa fa-tasks',
              faIconSize: 'fa-lg'
            },
            {
              name: 'Cooperation & Partnerships',
              state: 'https://www.cbd.int/cooperation/',
              type: 'link',
              mdIcon: 'compare_arrows'
            }
        ]});


        menus.cbdMenu.push({
          name: 'Cartagena Protocol',
          type: 'toggle',
          faIcon: 'fa-heartbeat',
          faIconSize: 'fa-lg',
          pages: [{
            name: 'Text of the Protocol',
            type: 'link',
            state: 'https://bch.cbd.int/protocol/text/',
            faIcon: 'fa-gavel',
            faIconSize: 'fa-lg'
          }, {
            name: 'List of Parties',
            state: 'https://bch.cbd.int/protocol/parties/',
            type: 'link',
            mdIcon: 'nature_people',
          },
            {
              name: 'Strategic Plan',
              state: 'https://bch.cbd.int/protocol/issues/cpb_stplan.shtml',
              type: 'link',
              mdIcon: 'directions_run',
            },
            {
              name: 'Biosafety Clearing-House',
              state: 'https://bch.cbd.int/',
              type: 'link',
              mdIcon: 'computer',
            }
          ]
        });


        menus.cbdMenu.push({
          name: 'Nagoya Protocol',
          type: 'toggle',
          faIcon: 'fa-share-alt-square',
          faIconSize: 'fa-lg',
          pages: [{
            name: 'Text of the Protocol',
            type: 'link',
            state: 'https://www.cbd.int/abs/text/',
            faIcon: 'fa-gavel',
            faIconSize: 'fa-lg'
          }, {
            name: 'List of Parties',
            state: 'https://www.cbd.int/abs/nagoya-protocol/signatories/',
            type: 'link',
            mdIcon: 'nature_people',
          },
            {
              name: 'ABS Clearing-House',
              state: 'https://absch.cbd.int/',
              type: 'link',
              mdIcon: 'computer',
            }
          ]
        });

        menus.cbdMenu.push({
          name: 'Programmes',
          type: 'toggle',
          faIcon: 'fa-tasks',
          faIconSize: 'fa-lg',
          pages: [{
            name: 'Thematic Programmes',
            type: 'link',
            state: 'https://www.cbd.int/programmes/',
            mdIcon: 'art_track',
          }, {
            name: 'Cross-Cutting Issues',
            state: 'https://www.cbd.int/programmes/',
            type: 'link',
            mdIcon: 'content_cut',
          },
            {
              name: 'Major Groups',
              state: 'https://www.cbd.int/programmes/',
              type: 'link',
              mdIcon: 'group_work',
            }
          ]
        });

        menus.cbdMenu.push({
          name: 'Information',
          type: 'toggle',
          mdIcon: 'info_outline',
          pages: [{
            name: 'Meetings',
            type: 'link',
            state: 'https://www.cbd.int/meetings/',
            faIcon: 'fa-users',
            faIconSize: 'fa-lg'
          }, {
            name: 'Notifications',
            state: 'https://www.cbd.int/notifications/',
            type: 'link',
            faIcon: 'fa-comments-o',
            faIconSize: 'fa-lg'
          },
            {
              name: 'National Information',
              state: 'https://www.cbd.int/countries/',
              type: 'link',
              mdIcon: 'flag',
            },
            {
              name: 'Publications',
              state: 'https://www.cbd.int/information/publications.shtml',
              type: 'link',
              faIcon: 'fa-book',
              faIconSize: 'fa-lg'
            }
          ]
        });


        menus.cbdMenu.push({
          name: 'Secretariat',
          type: 'toggle',
          mdIcon: 'gavel',
          pages: [{
            name: 'Overview',
            type: 'link',
            state: 'https://www.cbd.int/secretariat/staff/',
            // faIcon: 'fa fa-gavel',
            // faIconSize: 'fa-lg'
          }, {
            name: 'Staff',
            state: 'https://www.cbd.int/secretariat/staff/',
            type: 'link',
            // faIcon: 'fa-bluetooth',
            // faIconSize: 'fa-lg'
          },
            {
              name: 'Opportunities',
              state: 'https://www.cbd.int/secretariat/vacancies/',
              type: 'link',
              // faIcon: 'fa-bluetooth',
              // faIconSize: 'fa-2x'
            },
            {
              name: 'Contact Us',
              state: 'https://www.cbd.int/contact/',
              type: 'link',
              // faIcon: 'fa-bluetooth',
              // faIconSize: 'fa-2x'
            }
          ]
        });
//link config options

    _.each(menus,function(menu){
        var config= _.findWhere(menu,{'type':'config'});
      _.each(menu,function(menuItem){
              if(menuItem.type==='config')return;

              if(menuItem.type==='toggle'){
                menuItem.config=config;
                _.each(menuItem.pages,function(page){
                    page.config=config;
                    page.isChild=true;
                });
              }
              else {
                menuItem.config=config;
              }
      });


        });
        //=======================================================================
        //
        //=======================================================================
        function registerNavInstance(navId,navCtrl) {

          if (navId) {
            if(navRegistry[navId])
              navRegistry[navId]={};
            navRegistry[navId] = navCtrl;
          } else
            throw "Error: thrying to register a nav controler in the scbd-menuservice with out a navId";
        }

        //============================================================
        //
        //
        //============================================================
        function isOpenRight(navId){
        //  return $mdSidenav(navId).isOpen();
        }

        //============================================================
        //
        //
        //============================================================
        function debounce(func, wait, context) {
          var timer;
          return function debounced() {
            //var context = $scope,
            var    args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
              timer = undefined;
              func.apply(context, args);
            }, wait || 10);
          };
        }

        //============================================================
        //
        //
        //============================================================
        function toggle(navId) {
              whenNavCtrlLoaded(navId).then(navRegistry[navId].toggle());
        }
        //=======================================================================
        //
        //=======================================================================
        function whenNavCtrlLoaded(navId) {
          var deferred = $q.defer();
          deferred.resolved = 0;

          var cancelId = setInterval(function() {
            if (navRegistry[navId]) {

              deferred.resolve(navRegistry[navId]);
              deferred.resolved = 1;
              clearInterval(cancelId);
              return deferred.promise;
            }
          }, 100);
          setTimeout(function() {
            if (!deferred.resolved) {
              deferred.reject('Nav Controler is not loaded within 5 seconds.');
              clearInterval(cancelId);
            }
          }, 5000);
          return deferred.promise;
        }
        //============================================================
        //
        //
        //============================================================
        function buildDelayedToggler(navID,scope) {

          // return debounce(function() {
          //   $mdSidenav(navID)
          //     .toggle();
          // }, 200,scope);
        }
        //============================================================
        //
        //
        //============================================================
        function close(navID) {
            // $mdSidenav(navID).toggle(false);
          }
          //============================================================
          //
          //
          //============================================================
          function open(navID) {
              // $mdSidenav(navID).toggle(true);
            }

          //============================================================
          //
          //============================================================
          function closeAll() {
                _.each(navRegistry,function(navCtrl){
                    navCtrl.close();
                });
          }
          //============================================================
          //
          //============================================================
          function closeAllActive(menu) {
                _.each(menu,function(item){
                  if(item.type==='link'){
                      if(item.self && item.active)
                        item.self.deactivate();

                      if(item.active)
                        item.active=false;
                  } else if(item.type==='toggle'){
                    if(item.pages){
                        _.each(item.pages,function(){
                          if(item.self && item.active)
                            item.self.deactivate();

                          if(item.active)
                            item.active=false;
                        });
                    }
                  }//

                });
          }//closeAllActive

          return  {
            closeAllActive:closeAllActive,
            registerNavInstance:registerNavInstance,
            isOpen:isOpenRight,
            toggle: toggle,
            close: close,
            open: open,
            cbdMenu:menus.cbdMenu,
            accMenu:menus.accMenu,
            localeMenu:menus.localeMenu,
            dashboard:menus.dashboard
          };

      }]);

});