describe("mainController", function(){

    'use strict';

    var scope = {},
        momPaginator,
        moviesData,
        mainController;

    beforeEach(function(){
        addJsonEqualMatcher(this);
    });

    beforeEach(module(
            'app',
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'moviesData',
            'momUI.momPaginator'));

    beforeEach(inject(function($rootScope, _momPaginator_, _moviesData_, $controller){
        scope = $rootScope.$new();
        momPaginator = _momPaginator_;
        moviesData = _moviesData_;

        mainController = $controller('MainController', {$scope: scope, momPaginator: momPaginator, moviesData: moviesData});

    }));

    describe("MainController initialisation", function(){

        it("Should be defined", function(){
            expect(mainController).toBeDefined();
        });

        it("should initialise its scope properties correctly", function() {

            var mockModel = {
                page: 1,
                pages: [],
                filterText: '',
                filters: [],
                showNoMoviesMessage: false
            };

            expect(mainController.model).toBeJsonEqual(mockModel);
        });

    })



});