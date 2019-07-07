// state_utils.js
/**
 * 
 */
// var preisach = require(['./preisach.js'], );

(function(exports) {


	/**
	 * @params 	float[] 	thresholds
	 *
	 * @returns	float[]	history
	 */	
	function degaussHistory(thresholds) {
		// TODO
		// need this for best images for wikipedia
		let history = [];
		let size = thresholds.length - 3;
		let midIndex = Math.floor(thresholds.length/2);
		// Math.ceil(size/2);
		// console.log("midIndex = ", midIndex);

		// console.log("thresholds = ", thresholds);
		let midVal = (thresholds[thresholds.length-2] + thresholds[1]) / 2;
		// console.log("midVal = ", midVal);
		let eps = 0.0000001;
		// if ( thresholds[midIndex] < midVal + eps) {
		// 	midIndex++
		// }
		// console.log("midIndex = ", midIndex);
		let j = 1;
		for ( let i = size;  i > midIndex; i-- ) {
			// console.log("i = ", i);
			history.push(thresholds[i] + eps);
			history.push(thresholds[j++] - eps);
		}
		history.push(thresholds[midIndex] + eps);
		// history[0] = [];
		// history[1] = [];

		// let thresholds = initThresholds(support, size);
		// for (let j = 0; j < Math.ceil(size/2); j++) {
		// 	for(let i = j; i < size - j; i++) {

		// 	}
		// }
		/*
					states[k++] = 1;

				for(let i = size - j; i < size; i++) {
					states[k++] = 0;
				}
			}
			for (let j = Math.ceil(size/2); j < size; j++) {
				for(let i = j; i < size; i++) {
					states[k++] = 0;
				}
			}
				
			return states;
		*/
		return history;
	}

	/**
	function initStates(thresholds, history) {
		// function initStates(thresholds, str, state) {
		// xHistory ==> bistatState

		let size = thresholds.length - 3;
		let k = 0;
		let states = [];
		
		if (str === 'saturated') {
			// this.saturated = function() {
			// console.log("str = ", str);
			for (let j = 1; j <= size; j++) {
				for(let i = j+1; i <= size+1; i++) {
					states[k] = state;
					k++;
				}
			}
			return states;
			// }
		}		
		// this.deGaussed = function(thresholds) {			
		if (str === 'degaussed') {
			// TODO
			// need this for best images for wikipedia
			// console.log("thresholds = ", thresholds);
			for (let j = 0; j < Math.ceil(size/2); j++) {
				// console.log("j = ", j);
				for(let i = j; i < size - j; i++) {
					states[k++] = 1;
					// k++;
				}
				for(let i = size - j; i < size; i++) {
					states[k++] = 0;
				}
			}
			for (let j = Math.ceil(size/2); j < size; j++) {
				for(let i = j; i < size; i++) {
					states[k++] = 0;
				}
			}
				
			return states;
		}
	}
	*/
	exports.degaussHistory = degaussHistory;
})( typeof exports === 'undefined' ? this['state_utils'] = {}: exports );
