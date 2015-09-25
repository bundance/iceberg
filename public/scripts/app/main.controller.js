(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'momPaginator', 'moviesData'];

    function MainController($scope, momPaginator, moviesData) {

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
            filters: [],
            showNoMoviesMessage: false
        };

        // Setup the Paginator
        vm.paginator = getPaginator();

        vm.filterMovies = _.debounce(function(){
            vm.paginator.getPage(1, 'title', 'asc', filterFns)
                .then(function(data){
                    vm.model.showNoMoviesMessage = (data.length === 0);
                });
        }, 5);

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
                restSvc: moviesData,
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

    }
})();

