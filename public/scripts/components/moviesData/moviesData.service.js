(function() {
    'use strict';

    angular
        .module('moviesData')
        .factory('moviesData', moviesData);

    moviesData.$inject = ['moviesGetData', 'dataFormatter'];

    function moviesData(moviesGetData, dataFormatter){

        var service = {
            getData: getData,
            getTotalItemsCount: getTotalItemsCount
        };

        return service;

        ///////////////////

        function getData(itemsPerPage, pageNum, sortColumn, sortAscending, filters) {

            var params = dataFormatter.formatParams(itemsPerPage, pageNum, sortColumn, sortAscending, filters);

            return moviesGetData.getData(params)
                .then(function (items) {
                    return items;
                })
                .catch(function(err){
                    console.log("Error retrieving data");
                    console.dir(err);
                });
        }


        function getTotalItemsCount() {

            return service.getData()
                .then(_calculateTotalItems)
                .catch(_handleError);

        }

        ////////////////////

        /********  Helper function ***********/


        function _calculateTotalItems(items) {
            return (items) ? items.length : 0;
        }

        function _handleError() {
            return 0;
        }
    }

})();
