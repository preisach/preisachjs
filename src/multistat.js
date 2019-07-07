/**
 *	@author marcd
 * 	2019-06-09
 */

/**
 * 	script can be used inside a <script> tag, or installed via npm
 * 	tested using node runtime, 
 */

// 	TODO
	// write decent discrete update algorithm.
	// write good test for benchmarking discrete.update
	// invite update algorithm submissions
// 	Contributors welcome :)

(function(exports) {

	let b = require('./bistat');
	let initThresholds = require('./utils').initThresholds;

	/**
	 * multistat
	 * @params:
	 * 		support: 	DEFAULT [0, 1], pair of xmin, xmax for operator
	 * 		size: 		DEFAULT 1, 		number of bistats per side (=thresholds inside support-1, (-3 if support included))	 
	 * 		xHistory: 	DEFAULT [0], 		list
	 * 		weights: 	DEFAULT uniform,	1-D array of weights matching order of 1-D array of states
	 * @returns
	 * 		it's a constructor
	 */	 
	class multistat {
		constructor(
					support = [0, 1], 
					size = 1, 
					xHistory = [0], 
					weights = [[1]] 
		) {
			// this.weights = weights.slice();
			this.thresholds = initThresholds(support, size);
			this.bistats = this.initBistats(support, size, weights, this.thresholds);			
			this.output;
			this.rowSums = new Array(size).fill(0);
			this.colSums = new Array(size).fill(0);
			this.currentThreshold = 2;  
			// 2 because it is the next higher 'on' threshold
			// 2 is always fine because we call update(xHistory)
			// for positive saturation pass xhistory = support[1]
			for (let x of xHistory) {
				this.update(x); 
			}			
		}

		/**
		 * @params
		 * 		float[] support, 
		 * 		int size, 
		 * 		float[][] weights
		 * 		float[] thresholds: input threshold values 
		 * @returns 
		 * 		bistats[], bistat hysterons in the multistat operator
		 */
		initBistats(support, size, weights, thresholds) {
			let k = 0;
			let bistats = [];
			for (let i = 0; i < size; i++) {
				let i0 = size-1-i;
				for(let j = i0; j < size; j++) {
					bistats[k++] = 
						new b.weighted_bistat(thresholds[i0+1], thresholds[j+2], 0, 0, weights[i][j]);
				}
			}
			return bistats;
		}

		/**
		 * this is the default update function 
		 * it is only called when necessary, i.e. when a threshold is crossed
		 */
		updateBistats(bistats, index, isIncrease) { 
			let out = 0;
			let eps = 0.000000000001;
			for (let b of bistats) { 
				// out += b.update(input);
				out += b.update(this.thresholds[index] + (isIncrease?eps:-eps));
			}
			// TODO
			// think about rounding this value
			return out;
		}

		/**
		 *
		 */
		update(x) {
			// we have to ensure that we update everytime a thresholds is crossed
			let idxs = []; // list of the indices of the thresholds that were crossed			
			let tmp = this.currentThreshold; 
			while (x < this.thresholds[tmp - 2]) { //} && tmp >= 0) {
				idxs.push(tmp-2);
				tmp--;
			}
			while (x > this.thresholds[tmp]){ //} && tmp <= this.thresholds.length) {
				idxs.push(tmp++);
			}

			let inputs = [];
			let outputs = [];

			if (idxs.length != 0) { // if no jumps
				let isIncrease = false;

				if (this.currentThreshold < tmp) {
					isIncrease = true;					
				} 
				this.currentThreshold = tmp;
				// else { this.currentThreshold = idxs[idxs.length]; }

				for (let i = 0; i < idxs.length; i++) { // -1
					inputs.push(this.thresholds[idxs[i]]);
					outputs.push(this.updateBistats(this.bistats, idxs[i], isIncrease));
				}
				this.output = outputs[outputs.length - 1];
			}
			inputs.push(x);
			outputs.push(this.output);
			// CONS
			return [inputs, outputs]; //, this.rowSums, this.colSums];
		}
	
		/**
		 * this should probably be static, 
		 * but there is currently no reason to instantiate more that 1 multistat
		 * 
		 * @params 
		 * 		float x: new input value
		 * @returns 
		 * 		int[] idxs: indices of thresholds crossed from xOld to x
		 */
		regulateInput(x) {
			
			return idxs;
		}
	}

	exports.multistat = multistat;
	exports.initThresholds = initThresholds;	
})( typeof exports === 'undefined' ? this['preisach'] = {}: exports );
