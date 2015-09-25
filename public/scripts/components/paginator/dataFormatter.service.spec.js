describe('moviesData service', function(){
    'use strict';

    var dataFormatter,
        mockMovies,
        $rootScope,
        spies,
        $q,
        $httpBackend;

    beforeEach(function(){
        addJsonEqualMatcher(this);
    });

    beforeEach(module('momUI.momPaginator', 'mockMovies'));

    beforeEach(inject(function( _dataFormatter_, _mockMovies_){

        dataFormatter = _dataFormatter_;
        mockMovies = _mockMovies_;

    }));

    // Setup spies
    beforeEach(function(){
        spies  = {
            success: jasmine.createSpy(),
            error: jasmine.createSpy()
        }
    });

    describe('formatParams()', function() {

        it('should return undefined when all params are undefined', function () {
            expect(dataFormatter.formatParams()).toBeUndefined();
        });

        it('should return an object with per_page property set to the supplied itemsPerPage argument', function () {
            expect(dataFormatter.formatParams(1)).toBeJsonEqual({
                per_page: 1,
                page: 1,
                sort: undefined,
                order: 'asc',
                filters: undefined
            });
        });

        it('should return an object with order property set to the "asc" when no sortAscending argument is passed in', function () {
            expect(dataFormatter.formatParams(1)).toBeJsonEqual({
                per_page: 1,
                page: 1,
                sort: undefined,
                order: 'asc',
                filters: undefined
            });
        });

        it('should return an object with order property set to "desc" when sortAscending argument is false', function () {
            expect(dataFormatter.formatParams(1, 1, undefined, false)).toBeJsonEqual({
                per_page: 1,
                page: 1,
                sort: undefined,
                order: 'desc',
                filters: undefined
            });
        });

        it('should return an object with order property set to "asc" when no sortAscending argument is true', function () {
            expect(dataFormatter.formatParams(1, 1, undefined, true)).toBeJsonEqual({
                per_page: 1,
                page: 1,
                sort: undefined,
                order: 'asc',
                filters: undefined
            });
        });
    });

    describe('slice()', function() {

        it('should return 3 items when data pageNum is 1 and itemsPerPage is 3', function(){
            expect(dataFormatter.slice(mockMovies.movies, 1, 3).length).toBe(3);
        });

        it('should return 1 item when data pageNum is 1 and itemsPerPage is 1', function(){
            expect(dataFormatter.slice(mockMovies.movies, 1, 1).length).toBe(1);
        });

        it('should return 2 items when data pageNum is 1 and itemsPerPage is 2', function(){
            expect(dataFormatter.slice(mockMovies.movies, 1, 2).length).toBe(2);
        });

        it('should return the second item when data pageNum is 2 and itemsPerPage is 1', function(){
            expect(dataFormatter.slice(mockMovies.movies, 2, 1)[0].title).toBe(mockMovies.movies[1].title);
        });
    });


    describe('sort()', function(){

        it('should return 3 items, sorted alphabetically ascending on title, when sortColumn is "title" and sortOrder is "asc"', function(){
            expect(dataFormatter.sort(mockMovies.movies, 'title', 'asc')[0].title).toBe('2 Days in the Valley');
        });

        it('should return 3 items, sorted alphabetically descedning on title, when sortColumn is "title" and sortOrder is "asc"', function(){
            expect(dataFormatter.sort(mockMovies.movies, 'title', 'desc')[0].title).toBe('A Christmas Carol (1984)');
        });
    });

});