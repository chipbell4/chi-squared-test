var assert = require('assert');
var chiSquaredTest = require('./index.js');

var testOne = function(observations, expectations, degreesOfFreedomReduction, isSignificant) {
    var p = chiSquaredTest(observations, expectations, degreesOfFreedomReduction);

    if(isSignificant) {
        assert(p <= 0.05, 'Expected ' + p + ' to be significant');
    }
    else {
        assert(p > 0.05, 'Expected ' + p + ' to be not significant');
    }
};

var testCases = [
    [ [1, 1], [1, 1], 0, false ],
];


testCases.forEach(function(testCase) {
    testOne.apply(testOne, testCase);
});
