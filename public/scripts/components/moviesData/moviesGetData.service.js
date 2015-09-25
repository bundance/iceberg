/**
 *
 * The moviesGetData service would normally be an interface to a server-side REST API. However, as this is just
 * a demo, the usual data sorting and filtering commands have been replicated here on the client-side instead.
 * This inevitably impacts performance on devices with limited resources, but there's no noticeable performance
 * impact on any of the devices it's been tested on.
 *
 * For an example of how an equivalent service normally interacts with a server-based API, see gitHub-REST.service.js
 * in scripts/components/gitHubAPI
 *
 */
(function() {
    'use strict';

    angular
        .module('moviesData')
        .factory('moviesGetData', moviesGetData);

    moviesGetData.$inject = ['$http', 'dataFormatter'];

    function moviesGetData($http, dataFormatter) {

        var service = {
            getData: getData
        };

        return service;

        ///////////

        // Note: params are normally sent to a REST server, but here we don't
        // need them, as we're using local data, and sorting and filtering
        // it in our moviesData service, rather than on the server.
        function getData(params){
            return $http
                .get('http://127.0.0.1:3000/static/data/data.json')
                .then(function(response){
                    return dataFormatter.formatData(response.data.movies, params);
                });
        }
    }

})();

