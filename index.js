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
    var total = 0;
    var N = observations.length;
    for(var i = 0; i < N; i++) {
        total += calculateSingleChiSquaredTerm(observations[i], expectations[i]);
    }

    return total;
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

    var chiSquared = calculateChiSquaredStatistic(observations, expectations);
    return 1 - chi.cdf(chiSquared, degreesOfFreedom);
}
