/**
 * preisach_utils.js
 * @author marcd 2019-06-23
 * 
 */
// var preisach = require('./preisach.js');

(function(exports) {

	var dpDo = require('./dp2DLeftDo.js');
	

	/**
	 *
	 */
	function getAllIOPairs(arr, arrt, thresholds, weights) {
		let pairs = [];
		let input = [];
		let output = [];

		for ( let i = 0; i < arr.length; i++ ) {
			input = [];
			output = [];
			input[0] = arrt[i][0];
			input[1] = arrt[i][1];
			// BOGUS
			// weights is 1-D...combos are 2-D
			output[0] = output[1] = getOutput(arr[i], weights);
			pairs[i] = [input, output];
		}
		return pairs;
	}

	/**
	 * class:
	 * 		statio
	 * 	
	 *		structure containing:
	 *			truthy[][]	 	2-D array of states
	 * 			float[] 		thresholds of statio
	 * 			float 			output / level
	 */
	class statio {
		// constructor(historyAsArray, thresholds, output) {
			// this.arr = dpDo.deepCopy(historyAsArray);
			// this.thresholds = thresholds; // .slice();
			// this.output 	= output;
		constructor(allWeights, corners) {
			let size = allWeights.length;
			this.corners = corners.slice();
			this.arr = dpDo.corners2array(corners, size); // do I really need to compute this every time? // could i not find a way to update it??
			// console.log("arr = ", arr);
			this.thresholds; // = this.getThresholds(support, size, corners);
			this.output = dpDo.getStatioOutput(this.arr, allWeights);
		}

		/**
		 *
		 */
		setThresholds(support, size) {
			let i = this.corners.length;
			let precision = 1.0/(size + 2);
			let thresholds = [];
			
			if ( i == 0 ) {
				thresholds = [support[0], 2*precision];
			} else if ( this.corners.length == size-1 ) {
				thresholds = [(size - 1) * precision, 1 - precision];
			}else {
				thresholds = [i*precision, (i+2)*precision];
			}
			// console.log('i = ', i);
			// console.log('threholds = ', thresholds);
			this.thresholds = thresholds;
		}

	}

	/**
	 * recurser:
	 * 		required to create every internal state/combination
	 * 		maybe easiest to explain if I upload the animated gif and python script
	 * @params 
	 * 		maxSize, size, corners, statios
	 * @return statios, 
	 * 		a list of statios 
	 */
	function recurser(w, corners, size, statios) {
		if(size > 1) { 
			recurser(w, corners, size-1, statios);
			
			let tmp = corners.slice();
			tmp.push(size);

			recurser(w, tmp, size-1, statios);
		} else {						
			statios.push( new statio(w, corners) );
			// statios.push( buildStatio (corners, w) );
			
			let tmp = corners.slice();
			tmp.push(size);

			statios.push(new statio(w, tmp));
		}
		return statios;
	}


	/**
	 *
	 */
	function buildStatios (w) {
		// let l = d.thresholds.length - 3;
		let n = Math.pow(2, w.length);
		// let count = 0; // count is a global...cause the recurser nightmare
		let corners = [];
		let statios = []; //new Array(n);
		statios = recurser(w, corners, w.length, statios);
				// recurser(l, corners, array_of_combos, array_of_thresholds, l);
		// console.log('statios = ', statios[6].output);
		// let allStatios = getAllIOPairs(array_of_combos, array_of_thresholds, d.thresholds, d.weights);
		// let allCurves = combos2curves(array_of_combos, array_of_thresholds, d);
		// console.log('all pairs = ', allStatios);

		for (let s of statios) {
			s.setThresholds([0, 1], w.length);
		}
		return statios;
		// return allCurves;
	}
	exports.buildStatios = buildStatios;
	// exports.initWeights = initWeights;
})( typeof exports === 'undefined' ? this['preisach_utils'] = {}: exports );