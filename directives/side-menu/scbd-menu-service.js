define(['app'],function(app) {


'use strict';


  app.factory('scbdMenuService', [
      '$location','$timeout','$mdSidenav',

      function ($location,$timeout,$mdSidenav) {

        var dashboard= [];
        dashboard.push({
          name: 'Dashboard',
          type: 'link',
          mdIcon: 'dashboard',
          path: '/manage',

        });
        dashboard.push({
          name: 'Your Events',
          type: 'link',
          mdIcon: 'event',
         path: '/manage/events',
        });
        dashboard.push({
          name: 'Your Organizations',
          type: 'link',
          mdIcon: 'business',
          path: '/manage/organizations',
        });
        // dashboard.push({
        //   name: 'heading',
        //   type: 'heading',
        //
        //
        // });
        dashboard.push({
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



        var localeMenu= [];
        localeMenu.push({
          name: 'لعربية',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        localeMenu.push({
          name: '中文',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        localeMenu.push({
          name: 'English',
          type: 'link',
          mdIcon: 'language',

        });
        localeMenu.push({
          name: 'Español',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        localeMenu.push({
          name: 'Français',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });
        localeMenu.push({
          name: 'Русский',
          type: 'link',
          mdIcon: 'language',
          disabled:'true'
        });

        var accMenu= [];
        accMenu.push({
          name: 'Your Profile',
          type: 'link',
          mdIcon: 'person',
          state:'https://accounts.cbd.int/profile'
        });

        accMenu.push({
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
        accMenu.push({
          name: 'Password',
          type: 'link',
          faIcon: 'fa fa-key',
          faIconSize: 'fa-lg',
          state:'https://accounts.cbd.int/password'
        });
        accMenu.push({
          name: 'Sign-out',
          type: 'link',
          faIcon: 'fa fa-sign-out',
          faIconSize: 'fa-lg',
          //state:'signOut'
        });

        var cbdMenu= [];

        cbdMenu.push({
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


        cbdMenu.push({
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


        cbdMenu.push({
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

        cbdMenu.push({
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

        cbdMenu.push({
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


        cbdMenu.push({
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
        //============================================================
        //
        //
        //============================================================
        // function sortByHumanName(a, b) {
        //   return (a.humanName < b.humanName) ? -1 :
        //     (a.humanName > b.humanName) ? 1 : 0;
        // }

        //============================================================
        //
        //
        //============================================================
        function isOpenRight(navId){
          return $mdSidenav(navId).isOpen();
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
        function buildDelayedToggler(navID,scope) {

          return debounce(function() {
            $mdSidenav(navID)
              .toggle();
          }, 200,scope);
        }
        //============================================================
        //
        //
        //============================================================
        function close(navID) {
            $mdSidenav(navID).toggle(false);
          }
          //============================================================
          //
          //
          //============================================================
          function open(navID) {
              $mdSidenav(navID).toggle(true);
            }
          return  {
            isOpen:isOpenRight,
            toggle: buildDelayedToggler,
            close: close,
            open: open,
            cbdMenu:cbdMenu,
            accMenu:accMenu,
            localeMenu:localeMenu,
            dashboard:dashboard
          };

      }]);

});