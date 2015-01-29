var chi = require('chi-squared');

/**
 * Calculates a single chi-squared term in the sum for a single observation and expected value
 *
 * @param observed The observed frequency count
 * @param expected The expected frequency count
 */
var calculateSingleChiSquaredTerm = function(observed, expected) {
    return Math.pow(observed - expected, 2) / expected;
};

/**
 * Calculates the chi-squared statistic for a given list of observations and corresponding expectations
 *
 * @param observations The observation list
 * @param expectations The list of expectations
 */
var calculateChiSquaredStatistic = function(observations, expectations) {
    var resultSet = {
        chiSquared: 0,
        terms: []
    };
    var N = observations.length;
    for(var i = 0; i < N; i++) {
        var singleTerm = calculateSingleChiSquaredTerm(observations[i], expectations[i]);
        resultSet.terms.push(singleTerm);
        resultSet.chiSquared += singleTerm;
    }

    return resultSet;
};

/**
 * Calculates the probability of a given observation set fitting another distribution, via a Pearson's Chi-Squared test
 *
 * @param observations              The list of observations
 * @param expectations              The list of expected values
 * @param degreesOfFreedomReduction The reduction in degrees of freedom. In general this is p + 1, where p is the number
 *                                  of parameters estimated
 */
module.exports = function(observations, expectations, degreesOfFreedomReduction) {
    var degreesOfFreedom = observations.length - degreesOfFreedomReduction;

    var resultSet = calculateChiSquaredStatistic(observations, expectations);
    resultSet.probability = 1 - chi.cdf(resultSet.chiSquared, degreesOfFreedom);
    return resultSet;
}
