/**
 * discretePreisachDo.js
 * @author marcd 2019-06-29
 * 
 */
// var preisach = require(['./preisach.js'], );
/*
	bistats defines the shape of the state of then operator then...
	...everything else should have the same shape
	it is possible to use weights to find size 
	but it is already known when creating weights anyway
			size = math.sqrt(8*weights.length + 1) - 1
*/
(function(exports) {

	let b = require('./bistat');

	/**
	 *
	 */
	function newBistats(d, str) {		
		for (let j = 1; j <= size; j++) {
			for(let i = j+1; i <= size+1; i++) {
				bistats[k] = new b.weighted_bistat(thresholds[j], thresholds[i], 0, 0, weights[k++]);
			}
		}
	}

	// function newZeros
	// let weights = Array(l).fill().map(() => Array(l).fill(0)); // 2-D square array 0's
	
	/**
	 * 
	 */
	function fill(arr, num) {
		let size = arr.length;
		for (let i = 0; i < size; i++) {
			let i0 = size-1-i;
			// console.log("i0 = ", i0);
			for(let j = i0; j < size; j++) {
				arr[i][j] = num;
			}
		}
		return arr;
	}

	function deepCopy(arr) {
		let size = arr.length;
		let cpy = Array(size).fill().map(() => Array(size).fill(0));
		for (let i = 0; i < size; i++) {
			let i0 = size-1-i;
			for(let j = i0; j < size; j++) {
				cpy[i][j] = arr[i][j];
			}
		}
		return cpy;
	}

	/**
	 *
	 */
	function corners2array(corners, size) {
		let arr = Array(size).fill().map(() => Array(size).fill(0));
		let len = corners.length;
		let row = size - 1;
		for (let i = 0; i < len; i++, row--) { 	// row
			for (let j = 0; j < corners[i]; j++) {	// col
				arr[row][j+i] = 1;
			}
		}
		return arr;
	}

	/**
	 *
	 */
	function getStatioOutput(arr, w) {
		let size = arr.length;
		let output = 0;

		// console.log("weights = ", w);
		for (let i = 0; i < size; i++) {
			let i0 = size-1-i;
			for(let j = i0; j < size; j++) {
				output += arr[i][j]*w[i][j];
			}
		}
		return output;
	}

	/**
	 * getOutput: get sum of combo
	 * @params: 
	 * @return: {number}, the sum
	 */
	function getOutput(arr, weights) {
		let sum = 0;
		let k = 0;
		// BOGUS
		// SUMMING ENTIRE MATRIX WHEN THERE IS ONLY EVER GOING TO BE vals ON 1 SIDE 
		for(let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				// BOGUS
				// should not use uniform weights here !!!
				// weights should be part of the multistat model
				sum += arr[i][j]*weights[0]; 
			}
		}
		return sum;
	}

	
	// function (d, str) {		
	// 	for (let j = 1; j <= size; j++) {
	// 		for(let i = j+1; i <= size+1; i++) {
	// 		}
	// 	}
	// }

	exports.newBistats = newBistats;
	exports.fill = fill;
	exports.corners2array = corners2array;
	exports.getStatioOutput = getStatioOutput;
	exports.deepCopy = deepCopy;
	// exports.initWeights = initWeights;
})( typeof exports === 'undefined' ? this['preisachDo'] = {}: exports );
