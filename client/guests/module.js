angular.module("cr.guests", [])

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

            $scope.guests = GuestResource.get();

        }
        ]);
