describe("travelRepublicTestController", function(){

    describe("travelRepublicTestController initialisation", function(){

        beforeEach(module(
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.moviesJsonApi',   // change this to whatever ReST service you're using
            'momUI.momPaginator',
            'momUI',
            'ui.bootstrap-slider',
            'app'));

        var scope = {},
            momPaginator,
            moviesJsonData,
            travelRepublicController;

        beforeEach(inject(function($rootScope, _momPaginator_, _moviesJsonData_, $controller){
            scope = $rootScope.$new();
            momPaginator = _momPaginator_;
            moviesJsonData = _moviesJsonData_;

            travelRepublicController = $controller(scope, momPaginator, moviesJsonData);

        }))

        it("Should be defined", function(){
            expect(travelRepublicController).toBeDefined();
        });


    });

});