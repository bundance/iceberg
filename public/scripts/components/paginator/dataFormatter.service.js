(function(){
    'use strict';
    
    angular
        .module('momUI.momPaginator')
        .factory('dataFormatter', dataFormatter);
    
    function dataFormatter(){

        var DEFAULT_ITEMS_PER_PAGE = 10;

        var service = {
            formatParams: formatParams,
            formatData: formatData,
            slice: slice,
            sort: sort,
            filter: filter
        };

        return service;

        //////////////

        function formatParams(itemsPerPage, pageNum, sortColumn, sortAscending, filters) {
            if (_.every(arguments, function(arg){
                return typeof arg === 'undefined';
            })){
                return undefined;
            }
            else return {
                per_page: itemsPerPage || DEFAULT_ITEMS_PER_PAGE,
                page: pageNum || 1,
                sort: sortColumn,
                order: (sortAscending || _.isUndefined(sortAscending) || _.isNull(sortAscending)) ? 'asc' : 'desc',
                filters: filters
            };
        }

        function formatData(data, params){
            return (params)
                ? service.slice(service.sort(service.filter(data, params.filters),
                    params.sort,
                    params.order),
                params.page,
                params.per_page)
                : data;
        }
    
        function slice(data, pageNum, itemsPerPage){
            return data.slice((pageNum * itemsPerPage) - itemsPerPage, (pageNum * itemsPerPage));
        }
    
        function sort(data, sortColumn, sortOrder){
            return (sortOrder === 'desc')
                ? _.sortBy(data, sortColumn).reverse()
                : _.sortBy(data, sortColumn);
        }
    
        function filter(data, filters){
            if(!filters){
                return data;
            }
    
            _.each(filters, function(filterFn){
                data = _filterData(data, filterFn);
            });
    
            return data;

            ////////

            // Closure needed to persist _.filter's returned data
            function _filterData(data, filterFn){
                return _.filter(data, filterFn);
            }
        }
    }
})();