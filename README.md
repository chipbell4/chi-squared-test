# Chi-Squared Test
This package provides a small function for calculating a chi-squared test on a given dataset. Given an observed set of
frequencies `observations`, an expected set of frequencies `expectations`, and the number of degrees of freedom reduced
in the measurement, calculates the probability that the observations came from the same probability distribution.

For example, let's check a die for fairness:
```
var chiSquaredTest = require('chi-squared-test');

// We expect a fair die
var expected = [2, 2, 2, 2, 2, 2];

// Looks pretty unfair...
var observed = [6, 3, 3, 0, 0, 0];

// Reduction in degrees of freedom is 1, since knowing 5 categories determines the 6th
var reduction = 1;

var probability = chiSquaredTest(observed, expected, reduction);
// Gives 0.010362, which indicates that it's unlikely the die is fair 

// However, something a little more likely
observed = [1, 2, 4, 4, 2, 1];
probability = chiSquaredTest(observed, expected, reduction);
// Gives back 0.415881, which is indicates that they did come from the same distribution (by most statistical standards)
```
