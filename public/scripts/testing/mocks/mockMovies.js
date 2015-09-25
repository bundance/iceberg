(function(){

    'use strict';

    angular
        .module('mockMovies', [])
        .value('mockMovies', {
            "movies": [{
                "title": "2 Days in the Valley",
                "directors": {
                    "list": [{
                        "name": "John Herzfeld"
                    }]
                },
                "actors": {
                    "list": [{
                        "name": "James Spader"
                    }, {
                        "name": "Danny Aiello"
                    }, {
                        "name": "Eric Stoltz"
                    }]
                },
                "duration": 6000,
                "rating": 3,
                "year": 1996
            }, {
                "title": "20,000 Leagues Under The Sea",
                "directors": {
                    "list": [{
                        "name": "Richard Fleischer"
                    }]
                },
                "actors": {
                    "list": [{
                        "name": "James Mason"
                    }, {
                        "name": "Kirk Douglas"
                    }]
                },
                "duration": 7260,
                "rating": 4,
                "year": 1954
            },{
                "title": "A Christmas Carol (1984)",
                "directors": {
                    "list": [{
                        "name": "Clive Donner"
                    }]
                },
                "actors": {
                    "list": [{
                        "name": "George C. Scott"
                    }, {
                        "name": "Frank Finlay"
                    }, {
                        "name": "David Warner"
                    }]
                },
                "duration": 5760,
                "rating": 0,
                "year": 1984
            }]
        });
})();