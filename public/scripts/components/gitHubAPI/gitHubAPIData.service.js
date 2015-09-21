(function() {
    'use strict';

    angular
        .module('rest.gitHubAPI')
        .factory('gitHubData', gitHubData);

    gitHubData.$inject = ['gitHubREST'];

    function gitHubData(gitHubREST){

        var DEFAULT_ITEMS_PER_PAGE = 10;

        var service = {
            getData: getData,
            getTotalItemsCount: getTotalItemsCount
        };

        return service;

        ///////////////////

        function getData(itemsPerPage, pageNum, sortColumn, sortAscending) {

            // Setup QueryString params for itemsPerPage and pageNum
            var params = _formatParams(itemsPerPage, pageNum, sortColumn, sortAscending);

            // Get the data
            var promise = gitHubREST.getData(params).$promise;
            return promise.then(function (items) {
                return items.items;
            })
        }


        function getTotalItemsCount() {

            var promise = gitHubREST.getData({per_page: 1, page: 1}).$promise;
            return promise.then(_calculateTotalItems)
                .catch(_handleError);

        }

        ////////////////////

        /********  Helper function ***********/

        function _formatParams(itemsPerPage, pageNum, sortColumn, sortAscending) {

            return {
                per_page: itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
                page: pageNum || 1,
                sort: sortColumn,
                order: (sortAscending === true) ? 'asc' : 'desc'
            };

        }


        // The return value from this function should be a number, so replace the line below with
        // whatever property from items represents the total count of items in your paginated data.
        function _calculateTotalItems(items) {

            if (!items || !items.hasOwnProperty('total_count')) {
                return 0;
            }

            // Note: GitHub will return a maximum of 1,000 items for any search
            return (items.total_count > 1000) ? 1000 : items.total_count;
        }

        function _handleError() {
            return 0;
        }
    }

})();
