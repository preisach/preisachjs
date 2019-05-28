/**
 *	@author marcd
 * 	2019-03-01
 */

/**
 * 'preisach' is the top object of Preisach and defines the namespace
 *
 * 	script required for use inside a <script> tag, tested using node runtime, or installed via npm
 *
 */

/**
 *	TODO
 * 		improve, upgrade to ES6, increase functionality 
 * 		(and while at it probably use a build script and typescript)
 * 
 */

(function(exports) {
	let count; // combination counter

	// TODO
	// Find a beter name than thermostat, 
	// though opperation of thermostats is familiar, Preisach is not necesssarily concerned with temperature
	// similarly, non-idel relay might evoke an electrical relay which is another narrow category
	function thermostat(t1, t2, x0, y0)  {
		/**
		 * 	@params t1, t2, x0, y0
		 * 		lower threshold, higher threshold, intiial input, initial output
		 * 	@returns
		 * 		meh, this should probably look like a class
		 */
		this.low = t1;
		this.high = t2;
		this.input = x0;
		this.output = y0;
		
		this.update = function(x) {
			/**
			 *
			 */
			if(x <= this.low) {
				this.output = 0;
			} else if (x >= this.high) {
				this.output = 1;
			} 
			return this.output;
		}
		this.output = this.update(x0);
	}

	/**
	 * @params s1, s2, n, 
	 * 		support min, support max, number of thresholds inside support
	 * @return thresholds, 
	 * 		list of thresholds
	 */
	function initThresholds(s1, s2, n) { 
		let thresholds = [Number.NEGATIVE_INFINITY];
		let p = (s2 - s1)/(n+2.0);		
		for (let i = 1; i <= n+1; i++) {
			thresholds.push(s1 + (i)*p);
		}
		thresholds.push(Infinity);
		return thresholds;
	}

	/**
	 *
	 */
	function initStates() {
		
	}

	/**
	 *
	 */
	function initWeights() {		
		
	}

	/**
	 *
	 */
	
	discrete = function(s1, s2, n) {
		// this.init = function(s1, s2, n){
		this.thresholds = (function(s1, s2, n) {
			let thresholds = [Number.NEGATIVE_INFINITY];
			let p = (s2 - s1)/(n+2.0);		
			for (let i = 1; i <= n+1; i++) {
				thresholds.push(s1 + (i)*p);
			}
			thresholds.push(Infinity);
			return thresholds;
		})();
		this.states = function(thresholds, state) {
			this.saturated = function(thresholds, state) {
				let size = thresholds.length - 3;
				let k = 0;
				let arr = [];
				for (let j = 1; j <= size; j++) {
					for(let i = j+1; i <= size+1; i++) {
						arr[k] = state;
						k++;
					}
				}
				return arr;
				}
			/**
			 *
			 */
			this.deGaussed = function(thresholds) {
				/**
				 * TODO
				 */
				return 0;//arr;
			}
		}
		this.weights = function(thresholds) {
			/**
			 * uniformWeights
			 * 	@params
			 *		thresholds, a list of hysteron thresholds	 		
			 * 	@return 
			 *		// BOGUS 
			 *		// should probably use 2-D arrays or hash maps or something
			 *  	weights, a 1-D array of weights
			 */
			this.uniformWeights = function(thresholds) {
				// BOGUS		
				// bascally a place holder for a decent probability distribution manager		
				let l = thresholds.length - 2;
				let size = l * (l-1) / 2;
				let weights = [];
				let weight = 1.0/size;
				for (let i = 0; i < size; i++) {
					weights[i] = weight;
				}
				return weights;
			}
		}
		this.thermostats = function(
				thresholds, 
				x0, 
				states(thresholds, 1).saturated(thresholds, 1)
			) {
			let size = thresholds.length - 3;
			let k = 0;
			let thermostats = [];
			for (let j = 1; j <= size; j++) {
				for(let i = j+1; i <= size+1; i++) {
					thermostats[k] = new thermostat(thresholds[j], thresholds[i], x0, states[k]);
					k++;
				}
			}
			return thermostats;
		}
		// return [thresholds, states, weights];
		// }
		return {

		};
	}

	/**
	 *
	 */
	function discrete(thresholds, thermostats, weights, x0, y0) { 
		this.thresholds = thresholds;
		this.thermostats = thermostats;
		// BOGUS uniformWeights EVERYWHERE
		this.weights = weights;
		this.weight = this.weights[0];
		this.input = x0;

		// BOGUS
		// should have a check on validity of initial output	
		this.output = y0;

		// BOGUS
		// TOTAL NONSENSE WHY DO WE HAVE THIS currentThreshold PAIN IN THE ASS
		// MUST ALSO BE CAREFUL HOW IT IS ITITIALISED
		this.currentThreshold =  2; // thresholds.length - 2; 	


		/**
		 *
		 */
		this.update = function(x) {
			// BOGUS
			// it works because both input and output are stacks 
			// and we update all of the IO pairs at the same time ... but...
			// it is basically wrong to push on to a stack in both cases.			
			let inputs = this.regulateInput(x);	
			let outputs = []
			// for (let i of inputs) {
			for (let i = 0; i < inputs.length - 1; i++) {
				outputs.push(this.updateThermostats(inputs[i]));
			}
			// can't remember why I am doing this...
			// maybe for the nonlinear bit
			console.log('thermostats = ', this.thermostats);
			let s = 0;
			let s0 = this.thermostats[0].update(inputs[inputs.length - 1])*this.weight;
			for (let i = 0; i < this.thermostats.length; i++) {
				// console.log("updating thermostats");
				let ss = this.thermostats[i].update(inputs[inputs.length - 1])*this.weight;
				// console.log('this val = ', ss);
				if (ss - s0 > 0.00000001) {
					console.log('i = ', i);
					console.log('s0 = ', s0);
					console.log('this val = ', ss);
					console.log('thermostat = ', this.thermostats[i]);
					console.log('out = ', this.thermostats[i].output);
				}
				s += ss;
			}
			outputs.push(s);

			// console.log("currentthreshold = ", this.currentThreshold);
			// console.log("inputs = ", inputs);
			// console.log("outputs = ", outputs);

			return [inputs, outputs];
		}

		/**
		 * @params x, input
		 * @return steps, list, new input preceeded by input thresholds crossed from xOld to x
		 */
		this.regulateInput = function(x) {
			if (this.thresholds[this.currentThreshold - 1] < x && 
				x < this.thresholds[this.currentThreshold + 1]) {
				// console.log("THIS IS AN UPDATE WITH NO JUMPS")
				return [x];
			} 
			let inputSteps = [];
			while (x < this.thresholds[this.currentThreshold - 1]) { //} && this.currentThreshold >= 0) {
				inputSteps.push(this.thresholds[--this.currentThreshold]);
			}
			while (x > this.thresholds[this.currentThreshold + 1]){ //} && this.currentThreshold <= this.thresholds.length) {
				inputSteps.push(this.thresholds[++this.currentThreshold]);
			}
			inputSteps.push(x);
			return inputSteps;
		}

		/**
		 * TODO
		 * there are some clever ways to minimize the number of thermostats to be updated
		 * write a benchmark, cite fpga implementation,
		 * invite submissions
		 */
		this.updateThermostats = function (threshold) { 
			let sum = 0;
			for (let i = 0; i < this.thermostats.length; i++) {				
				let o = this.thermostats[i].update(threshold);
				sum += this.weight * o;
				// console.log('Thermostat Num... = ', i);
				// console.log('weight = ', this.weight);
			}
			// console.log('Sum Thermostats... = ', sum);
			return sum;
		}
	}

	/**
	 *
	 */
	function utils() {
		
	}


	/**
	 * @params 
	 * 		size, corners, arr, arrt, sideLength
	 * @return [arr, arrt], 
	 * 		a list of 2-D arrays of states and an array of thresholds
	 */
	function recurser(size, corners, arr, arrt, sideLength) {
		// required to create every internal state/combination
		// maybe easiest to explain if I upload the animated gif and python script
		if(size > 1) {
			// console.log("count = ", count);
			recurser(size-1, corners, arr, arrt, sideLength);
			let tmpCorners = corners.slice(); 	// use .slice() to create a element-wise copy
			tmpCorners.push(size);				// not sure why I really need a copy
			recurser(size-1, tmpCorners, arr, arrt, sideLength);
		} else {
			let i;
			let j;
			let c;
			for (i = 0; i < corners.length; i++) { // row
				c = corners[i];
				for (j = 0; j < c; j++) {			// col
					arr[count][sideLength-1 - i][i+j] = 1;
				}
			}
			// arrt.push(corners);
			let l = 1.0/(sideLength + 2);
			if ( i == 0 ) {
				/* BOGUS */
				/* should not use [0, 1] should use [inMin, inMax] */ 
				arrt.push([0, 2*l]);
				arrt.push([l, 3*l]);
			} else if ( corners.length == sideLength-1 ) {
				// console.log("i =  ", sideLength);
				arrt.push([(sideLength - 1) * l, 1 - l]);
				arrt.push([(sideLength ) * l, 1]);

			}else {
				arrt.push([(i-0)*l, (i+2)*l]);
				arrt.push([(i+1)*l, (i+3)*l]);
			}	

			count = count + 1;
			// BOGUS
			// doing the other side of the diagonal too which is a total waste!!!
			for (let i = 0; i < sideLength; i++) {
				for (let j = 0; j < sideLength; j++) {
					// console.log("count = ", count);
					// console.log("arr = ", arr[count]);
					arr[count][i][j] = arr[count-1][i][j];
				}
			}
			arr[count][sideLength-1 - corners.length][corners.length] = 1;
			count = count + 1;
		}
		return [arr, arrt];
	}

	/**
	 * get sum of combo
	 * @return {number}, the sum
	 */
	function discreteSum(arr, weights) {
		let sum = 0;
		let k = 0;
		// BOGUS
		// SUMMING ENTIRE MATRIX WHEN THERE IS ONLY EVER GOING TO BE vals ON 1 SIDE 
		// 
		for(let i = 0; i < arr.length; i++) {
			for (let j = 0; j < arr.length; j++) {
				// BOGUS
				// uniform weights here !!!
				sum += arr[i][j]*weights[arr.length]; 
			}
		}
		console.log('sum = ', sum);
		return sum;
	}

	/**
	 *
	 */
	function getAllIOPairs(arr, arrt, thresholds) {
		let pairs = [];
		let input = [];
		let output = [];
		let w = new initWeights().uniformWeights(thresholds);
		for ( let i = 0; i < arr.length; i++ ) {
			input = [];
			output = [];
			input[0] = arrt[i][0];
			input[1] = arrt[i][1];

			// weights is 1-D...combos are 2-D
			output[0] = output[1] = discreteSum(arr[i], w);
			pairs[i] = [input, output];
		}
		return pairs;
	}

	/**
	 *
	 */
	function createAllCombos (d) {
		let l = d.thresholds.length - 3;
		let n = Math.pow(2, l);

		// count is a global...cause the recurser nightmare
		count = 0;

		let corners = [];
		let array_of_combos = new Array(n);
		let array_of_thresholds = []; // = new Array(n);
		for (let i = 0; i < n; i++) {
			array_of_combos[i] = new Array(l);
			for (let j = 0; j < l; j++) {
				array_of_combos[i][j] = new Array(l);
				for (let k = 0; k < l; k++) {
					array_of_combos[i][j][k] = 0;
				}
			}
		}


		[array_of_combos, array_of_thresholds] = 
				recurser(l, corners, array_of_combos, array_of_thresholds, l);

		let allStatios = getAllIOPairs(array_of_combos, array_of_thresholds, d.thresholds);
		// let allCurves = combos2curves(array_of_combos, array_of_thresholds, d);
		console.log('all pairs = ', allStatios);

		return allStatios;
		// return allCurves;
	}

	// module.exports.preisach = preisach;
	exports.thermostat = thermostat;
	exports.initThresholds = initThresholds;
	exports.initStates = initStates;
	exports.initWeights = initWeights;
	exports.initThermostats = initThermostats;
	// exports.utils = utils;
	exports.discrete = discrete;
	exports.createAllCombos = createAllCombos;
})( typeof exports === 'undefined' ? this['preisach'] = {}: exports );
