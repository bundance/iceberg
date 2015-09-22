(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'momPaginator', 'moviesJsonData'];

    function MainController($scope, momPaginator, moviesJsonData) {

        var vm = this;

        var filterFns = {
            filterFn: function (item) {
                var lowerCaseFilterText = vm.model.filterText.toLowerCase(),
                    lowerCaseTitle = item.title.toLowerCase();

                return (lowerCaseTitle.substr(0, lowerCaseFilterText.length ) === lowerCaseFilterText);
            }
        };

        // Initialise controller's model
        vm.model = {
            page: 1,
            pages: [],
            filterText: '',
            filters: []
        };

        // Setup the Paginator
        vm.paginator = getPaginator();
        // Enable sorting
        vm.toggleSort = toggleSort;
        // Enable filtering
        vm.applyFilter = applyFilter;
        vm.filterBy = {};
        vm.showNoMoviesMessage = false;

        vm.filterMovies = _.debounce(function(){
            vm.paginator.getPage(1, 'title', 'asc', filterFns)
                .then(function(data){
                    vm.showNoMoviesMessage = (data.length === 0);
                });
        }, 5);
        // Initialise the price range sorter

        // Initialisation
        activate();

        ////////////////////

        function activate(){
            // Initialise the paginator
            vm.paginator.initialise()
                .then(_getPage);

            // Set watches
            $scope.$watch(function() {
                    return vm.model.page;
                },
                function (newPageNum) {
                    _getPage(newPageNum);
                });

            /*  Helper function  */
            function _getPage(pageNum) {
                return vm.paginator.getPage(pageNum, 'title', 'asc')
                    .then(function () {
                        vm.model.pages = vm.paginator.getPageNumbers();
                    })
            }
        }

        function getPaginator() {
            return momPaginator({
                restSvc: moviesJsonData,
                initialPage: 1,
                itemsPerPage: 20,
                sortIcons: {
                    sortIconUp: 'glyphicon glyphicon-arrow-up',
                    sortIconDown: 'glyphicon glyphicon-arrow-down',
                    sortIconNone: 'glyphicon glyphicon-resize-vertical'
                }
            });
        }

        function toggleSort(sortParams) {
            return vm.paginator.toggleSort(sortParams.columnName, vm.model.filters)
                .then(function () {
                    return {icon: vm.paginator.getSortIcon(sortParams.columnName)};
                })
        }

        function applyFilter(){
            vm.paginator.getPage(1, 'title', 'asc', filterFns);
        }


    }
})();

