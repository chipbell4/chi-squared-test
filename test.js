var assert = require('assert');
var chiSquaredTest = require('./index.js');

var testOne = function(observations, expectations, degreesOfFreedomReduction, isSignificant) {
    var resultSet = chiSquaredTest(observations, expectations, degreesOfFreedomReduction);
    var p = resultSet.probability;

    if(isSignificant) {
        assert(p <= 0.05, 'Expected ' + p + ' to be significant');
    }
    else {
        assert(p > 0.05, 'Expected ' + p + ' to be not significant');
    }

    console.log('Passed:' + JSON.stringify(resultSet));
};

var testCases = [
    [ [1, 1], [1, 1], 1, false ],
    [ [6, 3, 3, 0, 0, 0], [2, 2, 2, 2, 2, 2], 1, true ],
    [ [2, 2, 4, 4, 2, 2], [2, 2, 2, 2, 2, 2], 1, false],
];


testCases.forEach(function(testCase) {
    testOne.apply(testOne, testCase);
});
