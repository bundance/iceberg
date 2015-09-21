describe("travelRepublicTestController", function(){

    describe("travelRepublicTestController initialisation", function(){

        beforeEach(module(
            'ngResource',
            'ngSanitize',
            'ngRoute',
            'rest.hotelsJsonApi',   // change this to whatever ReST service you're using
            'momUI.momPaginator',
            'momUI',
            'ui.bootstrap-slider',
            'travelRepublicTestApp'));

        var scope = {},
            momPaginator,
            hotelsJsonData,
            travelRepublicController;

        beforeEach(inject(function($rootScope, _momPaginator_, _hotelsJsonData_, $controller){
            scope = $rootScope.$new();
            momPaginator = _momPaginator_;
            hotelsJsonData = _hotelsJsonData_;

            travelRepublicController = $controller(scope, momPaginator, hotelsJsonData);

        }))

        it("Should be defined", function(){
            expect(travelRepublicController).toBeDefined();
        });


    });

});