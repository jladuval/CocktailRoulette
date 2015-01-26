angular.module('app', [
    // angular
    "ngResource",

    'ui.router',

    'cr.guests'
]);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    //for any unamtched urls go here
    $urlRouterProvider.otherwise("/guests");
    $.material.init();

}]);
// Make sure to include the `ui.router` module as a dependency
angular.module('app').run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    // so that you can access them from any scope within your applications.
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);

angular.module('app').controller('AppCtrl', ['$scope', function ($scope) {
}]);