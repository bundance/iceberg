(function() {
    'use strict';

    angular
        .module('app', [
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.moviesJsonApi',   // change this to whatever ReST service you're using
            'momUI.momPaginator',
            'ui.bootstrap-slider'
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
