/**
 * weight_utils.js
 * @author marcd 2019-07-03
 * 
 */
// BOGUS		
// bascally a place holder for a decent probability distribution manager	
(function(exports) {
	var dpDo = require('./dp2DLeftDo.js');
	
	/**
	 * uniformWeights
	 * 	@params
	 *		thresholds, a list of hysteron thresholds	 		
	 * 	@return 
	 *  	float[][] weights, a 2-D array of weights
	 */
	function uniformWeights(thresholds) {	
		let l = thresholds.length - 3;
		let weights = Array(l).fill().map(() => Array(l).fill(0)); // 2-D square array 0's
		let total = (l * (l+1) / 2);
		let weight = 1.0/total;
		weights = dpDo.fill(weights, weight);
		// console.log("weights = ", weights);
		return weights;
	}

	exports.uniformWeights = uniformWeights;
})( typeof exports === 'undefined' ? this['weight_utils'] = {}: exports );
