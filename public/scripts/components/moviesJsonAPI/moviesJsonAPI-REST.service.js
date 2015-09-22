/**
 *
 * The moviesJsonREST service would normally be an interface to a server-side REST API. However, as this is just
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
        .module('rest.moviesJsonApi')
        .factory('moviesJsonREST', moviesJsonREST);

    moviesJsonREST.$inject = ['$http'];

    function moviesJsonREST($http) {

        var allData,
            formattedData,
            lastSortedColumn = 'Name';

        var service = {
            getData: getData,
            priceMin: 0,
            priceMax: 10000,
            filterBy: {}
        };

        return service;

        ///////////

        function getData(params){
            return _getDataFromSource()
                    .then(function(data){
                        return _formatData(data, params);
                    });

            function _formatData(data, params){
                return (params)
                    ? _slice(_sort(_filter(data, params.filters),
                                   params.sort,
                                   params.order),
                             params.page,
                             params.per_page)
                    : data;
            }

            function _slice(data, pageNum, itemsPerPage){
                return data.slice((pageNum * itemsPerPage) - itemsPerPage, (pageNum * itemsPerPage));
            }

            function _sort(data, sortColumn, sortOrder){
                return (sortOrder === 'desc')
                    ? _.sortBy(data, sortColumn).reverse()
                    : _.sortBy(data, sortColumn);
            }

            function _filter(data, filters){
                if(!filters){
                    return data;
                }

                _.each(filters, function(filterFn){
                    data = _filterData(data, filterFn);
                });

                return data;

                function _filterData(data, filterFn){
                    return _.filter(data, filterFn);
                }
            }
        }

        function _getDataFromSource(){
            return $http
                .get('http://127.0.0.1:3000/static/data/data.json')
                .then(function(response){
                    return response.data.movies;
                });
        }
    }

})();

