/**
 * weight_utils.js
 * @author marcd 2019-07-03
 * 
 */

const u = require('../src/utils');
const wu = require('../src/weight_utils');

function log(str) {
	console.log("// TEST LOG: \n// Weights Test\n\t", str, "\n//");
}

let support = [0, 1];
let size = 2;
let out = [[0, 1./3], [1./3, 1./3]];


test('Testing uniformWeights()', () => {
	let thresholds = u.initThresholds(support, size)
	log("thresholds = "+thresholds);
	w = wu.uniformWeights(thresholds);
	log("weights = " + w);

	expect(w).toEqual(out);
});