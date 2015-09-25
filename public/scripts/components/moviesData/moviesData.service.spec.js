describe('moviesData service', function(){
    'use strict';

    var dataFormatter,
        moviesGetData,
        moviesData,
        mockMovies,
        $rootScope,
        spies,
        $q,
        $httpBackend;

    beforeEach(function(){
        addJsonEqualMatcher(this);
    });

    beforeEach(module('app', 'moviesData', 'mockMovies'));

    beforeEach(inject(function(_$rootScope_, _$q_, _$httpBackend_, _moviesData_,  _moviesGetData_, _dataFormatter_, _mockMovies_){

        moviesGetData = _moviesGetData_;
        dataFormatter = _dataFormatter_;
        mockMovies = _mockMovies_;
        moviesData = _moviesData_;

        $rootScope = _$rootScope_;
        $q = _$q_;
        $httpBackend = _$httpBackend_;

    }));

    // Setup spies
    beforeEach(function(){
        spies  = {
            success: jasmine.createSpy(),
            error: jasmine.createSpy()
        }
    });

    describe('getData()', function(){

        beforeEach(function(){
            $httpBackend.when('GET', 'http://127.0.0.1:3000/static/data/data.json')
                .respond(mockMovies);
            $httpBackend.expectGET('http://127.0.0.1:3000/static/data/data.json');
        });

        it('should return the mock data correctly', function() {
            moviesData.getData()
                .then(function (items) {
                    expect(items).toBeJsonEqual(mockMovies.movies);
                    spies.success();
                })
                .catch(spies.error);

            _sendRequest();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);
        });


        it('should return 1 item of data when itemsPerPage is 1', function() {
            moviesData.getData(1)
                .then(function (items) {
                    expect(items.length).toBe(1);
                    spies.success();
                })
                .catch(spies.error);

            _sendRequest();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);
        });

        it('should return second page of data when pageNum = 2', function() {
            moviesData.getData(1, 2)
                .then(function (items) {
                    expect(items.length).toBe(1);
                    expect(items[0].title).toBe(mockMovies.movies[1].title);
                    spies.success();
                })
                .catch(spies.error);

            _sendRequest();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);
        });
    });

    describe('getTotalItemsCount()', function(){

        beforeEach(function(){
            $httpBackend.when('GET', 'http://127.0.0.1:3000/static/data/data.json')
                .respond(mockMovies);
            $httpBackend.expectGET('http://127.0.0.1:3000/static/data/data.json');
        });

        it('should return the total number of items returned', function(){

            moviesData.getTotalItemsCount()
                .then(function(totalItemsCount){
                    expect(totalItemsCount).toBe(3);
                    spies.success();
                })
                .catch(spies.error);

            _sendRequest();

            expect(spies.success.callCount).toBe(1);
            expect(spies.error.callCount).toBe(0);
        });


    });

    ///////// Helper Functions /////////

    function _sendRequest(){
        $rootScope.$digest();
        $httpBackend.flush();
    }

});