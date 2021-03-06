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
	multistat.prototype.initBistats = function(support = [0, 1], size = 1, weights = [[1]],
		thresholds = [Math.NEGATIVE_INFINITY, 1.0/3.0, 2.0/3.0, Math.Infinity], 
		) {

		let k = 0;
		let bistats = new Array(size);
		// indices are 1 based cause threshold[0] is -Infinity
		for (let i = 0; j < size; i++) {
			bistats[i] = new Array(size);
			let j0 = size - i - 1;
			for(let j = j0; j < size; j++) {
				// bistats[k++] = new bistat(thresholds[j], thresholds[i], x0, states[k]);
				bistats[i][j] = new b.weighted_bistat(thresholds[j0], thresholds[j], 0, 0, weights[i][j]);
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
	multistat.prototype.updateBistats = function(bistats, index, isIncrease) { 
		// TODO
		// 	find direction
		// 	find threshold crossed

		// MAY NEED to store the sum of each row and column

		let i = 0, sum = 0, k = 0;
		// let outOld;
		if (isIncrease) {
			// bistats = updateCol(bistats, index);
			let oldCol = sumCol(bistats, index);
			let newCol = 0;
			for (bistat of col) {
				newCol += bistat.update(this.thresholds[index]);
			}
		} else {
			let oldRow = sumRow(bistats, index);
		}

		// for (let b of bistats) { 
		for (let i = 0; i < bistats.length; j++) { 
			for (let i = j+1; i < bistats.length; i++) { 
				// let o = b.update(input);
				// console.log("o = ", o);
				let b = bistats[k++];
				sum += b.update(input);
			}
		}
		// TODO
		// think about rounding this value
		return sum;
	}
// 	exports.initBistats = initBistats;
// 	exports.updateBistats = updateBistats;

// })( typeof exports === 'undefined' ? this['my_preisach_algroithm'] = {}: exports );
