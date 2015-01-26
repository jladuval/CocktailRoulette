angular.module("cr.guests", ['webcam'])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('guests', {
                url: '/guests',
                templateUrl: '/guests/index.tpl.html',
                controller: 'GuestsCtrl'
            });
    }])


    .factory('GuestResource', ['$resource', function ($resource) {
        return $resource('/guests');
    }])


    .controller("GuestsCtrl", ['$scope', 'GuestResource', '$timeout',
        function ($scope, GuestResource, $timeout) {
            var gifs = [
                'http://mashable.com/wp-content/uploads/2013/07/excited-baby.gif',
                'http://media.tumblr.com/daeb25476d150b362f9774d84deeb1c8/tumblr_inline_nfnpotY22X1ss27h4.gif',
                'https://inittoloseit13.files.wordpress.com/2014/07/gif-3.gif',
                'http://media.giphy.com/media/1SU5JUyhUIzJe/giphy.gif',
                'http://media.giphy.com/media/nNxT5qXR02FOM/giphy.gif',
                'http://mashable.com/wp-content/uploads/2013/07/Monty-Python.gif',
                'http://mashable.com/wp-content/uploads/2013/07/angry-dance.gif',
                'http://mashable.com/wp-content/uploads/2013/07/Inglorious-Bastards.gif',
                'http://mashable.com/wp-content/uploads/2013/07/excited-child.gif',
                'http://mashable.com/wp-content/uploads/2013/07/surpirsed-baby.gif',
                'http://mashable.com/wp-content/uploads/2013/07/Jeremy-Renner.gif',
                'http://mashable.com/wp-content/uploads/2013/07/Bear-in-the-Big-Blue-House.gif',
            ]

            $scope.guests = GuestResource.query();

            $scope.saveGuest = function(){
                var newGuest = new GuestResource({
                    name: $scope.guestName
                })
                newGuest.$save();
                $scope.guests.push(newGuest);
                resetForm();
            };

            $scope.cancel = function(){
                resetForm();
            }

            $scope.getRandomGuest = function(){
                resetForm();
                playSound();
                $scope.loadingGif = gifs[Math.floor(Math.random() * gifs.length)]
                $scope.loading = true;
                $timeout(function(){
                    $scope.loading = false;
                    $('body').scrollTop(1);
                    $scope.showSelected = true;
                    $scope.selectedGuest = $scope.guests[Math.floor(Math.random() * $scope.guests.length)]
                }, 13000)
            }

            $scope.newGuest = function(){
                $('body').scrollTop(1);
                $scope.showForm = true;
                $scope.guestName = '';
            }

            function resetForm(){
                $('body').scrollTop(1);
                $scope.loading = false;
                $scope.guestName = '';
                $scope.showForm = false;
                $scope.showSelected = false;
            }

            function playSound(el,soundfile) {
                if(!soundfile)
                    soundfile = "http://localhost:3000/countdown.mp3"
                if(!el)
                    el = {};
              if (el && el.mp3) {
                  if(el.mp3.paused) el.mp3.play();
                  else el.mp3.pause();
              } else {

                  el.mp3 = new Audio(soundfile);
                  el.mp3.play();
              }
          }

        }
    ]);
