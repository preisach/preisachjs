// .js
/**
 * Sample means of overriding the default init and update methods
 *
 * Intention is to try different storage methods to test for the most efficient update algorithm
 *
 */


// (function(exports) {
	let b = require('../bistat');
	let multistat = require('../multistat').multistat;

	/**
	 * @params
	 * 		float[] support, 
	 * 		int size, 
	 * 		float[][] weights
	 * 		float[] thresholds, list: input threshold values 
	 * @returns 
	 * 		bistat[][] bistats, a collection refrencing the bistat hysterons in the multistat operator
	 *
	 * support not required, it is part of the multistat object; not the collection of bistatss
	 */
	multistat.prototype.initBistats = function(support = [0, 1], size = 1, weights = [1],
		thresholds = [Math.NEGATIVE_INFINITY, 1.0/3.0, 2.0/3.0, Math.Infinity], 
		) {

		let k = 0;
		let bistats = new Array(size);
		// indices are 1 based cause threshold[0] is -Infinity
		for (let i = 0; i < size; i++) {
			bistats[i] = new Array(size);
			let j0 = size - i - 1;
			for(let j = j0; j < size; j++) {
				// bistats[k++] = new bistat(thresholds[j], thresholds[i], x0, states[k]);
				bistats[i][j] = new b.weighted_bistat(thresholds[j0+1], thresholds[j+2], 0, 0, weights[i][j]);
			}
		}
		return bistats;
	}

	/**
	 * TODO
	 * there are some clever ways to minimize the number of bistats to be updated
	 * write a benchmark, cite fpga implementation,
	 * invite submissions
	 */
	multistat.prototype.updateBistats = function(bistats, index) { 
		// TODO
		// 	use direction to update only 1 row or 1 col
		let i = 0, sum = 0, k = 0;

		for (let i = 0; i < bistats.length; i++) {
			let j0 = bistats.length - i - 1;
			for(let j = j0; j < bistats.length; j++) {
				let b = bistats[i][j];
				let val = b.update(this.thresholds[index]);
				// console.log("val = ", val);
				sum += val;
			}
		}
		return sum;
	}
// 	exports.initBistats = initBistats;
// 	exports.updateBistats = updateBistats;

// })( typeof exports === 'undefined' ? this['my_preisach_algroithm'] = {}: exports );
