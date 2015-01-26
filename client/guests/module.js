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


    .controller("GuestsCtrl", ['$scope', 'GuestResource',
        function ($scope, GuestResource) {
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
                $('body').scrollTop(1);
                $scope.showSelected = true;
                $scope.selectedGuest = $scope.guests[Math.floor(Math.random() * $scope.guests.length)]
            }

            $scope.newGuest = function(){
                $('body').scrollTop(1);
                $scope.showForm = true;
                $scope.guestName = '';
            }

            function resetForm(){
                $scope.guestName = '';
                $scope.showForm = false;
                $scope.showSelected = false;
            }

        }
    ]);
