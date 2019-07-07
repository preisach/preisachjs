
/**
 * preisach_utils.js
 * @author marcd 2019-06-23
 * 
 */
// var preisach = require(['./preisach.js'], );

(function(exports) {
	/**
	 * @params support, size, 
	 *      support min, max,
	 *      number of thresholds inside support
	 * @return thresholds, 
	 *      float[] list of thresholds
	 */
	function initThresholds(support = [0, 1], size = 1) { 
		let thresholds = [Number.NEGATIVE_INFINITY];
		let precision = (support[1] - support[0])/(size+2.0);       
		for (let i = 1; i <= size+1; i++) {
			thresholds.push(support[0] + i*precision);
		}
		thresholds.push(Infinity);
		return thresholds;
	}

	/**
	 * 
	 */
	function list2ragged(l) {
		let arr;
		// BOGUS
		// pretty sure this isn't right
		let size = Math.sqrt(2*l);
		let k = 0;
		for (let i = 0; i < size; i++) {
			for (let j = 0; j < i; j++) {
				arr[i][j] = l[k++];
			}
		}
		return arr;
	}

	function ragged2list(arr) {
		let size = arr[arr.length-1].length;
		let k = 0;
		let j = size - 1;
		for (let row of arr) {
			for (let elem of row) {
				l[k++] = elem;
			}
		}
		return l;
	}

	
	function array2dToJson(a, p, nl) {
		var i, j, s = '{"' + p + '":[';
		nl = nl || '';
		for (i = 0; i < a.length; ++i) {
			s += nl + array1dToJson(a[i]);
			if (i < a.length - 1) {
		  		s += ',';
			}
		}
		s += nl + ']}';
		return s;
	}

	function array1dToJson(a, p) {
		var i, s = '[';
		for (i = 0; i < a.length; ++i) {
			if (typeof a[i] == 'string') {
			  s += '"' + a[i] + '"';
			}
			else { // assume number type
			  s += a[i];
			}
			if (i < a.length - 1) {
			  s += ',';
			}
		}
		s += ']';
		if (p) {
			return '{"' + p + '":' + s + '}';
		}
		return s;
	}

	exports.initThresholds = initThresholds;
	exports.array2dToJson = array2dToJson;
	exports.array1dToJson = array1dToJson;
	// exports.initWeights = initWeights;
})( typeof exports === 'undefined' ? this['preisach_utils'] = {}: exports );
