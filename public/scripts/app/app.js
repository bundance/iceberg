(function() {
    'use strict';

    angular
        .module('app', [
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'moviesData',
            'momUI.momPaginator'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'static/views/main.html',
                    controllerAs: 'mainCtrl',
                    controller: 'MainController'
                })
                .when('/about', {
                    templateUrl: 'static/views/about.html'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });
})();
