// multistat.test.js

const mu = require('../src/multistat');
// const ma = 
// require('../algorithms/my_preisach_algorithm');

function log(str) {
	console.log("// TEST LOG: \n", str, "\n//");
}

let support = [0, 1];
let sideSize = 2;
let weights = [[0, .3], [.3, .4]];
let history = [0];
let in_proto = [2, 3]; // these are the threshold indices
let in_proto2 = [2, 1];
let outThreshold2 = 0.3;
let outThreshold1 = 0;
let update_out = .3;
let out_proto = [[0.5, 0.75, 1], [0.3, 1, 1]];
// let out_proto = [[0, 0.5, 0.75, 1], [0, 0.3, 1, 1]];
// unfortunately 0 is not in thresholds
let out_proto10 = [[0.5, 0.25, 0], [0.7, 0, 0]];

m = new mu.multistat(support, sideSize, history, weights);
// for (let b of m.bistats) {
// 	log("b = ", b);
// 	log("weight = ", b.weight);
// }

// test('test regulateInput 0->1', () => {
// 	let input = m.regulateInput(1);
// 	// console.log("input = ", input);
// 	expect(input).toEqual(in_proto);
// });

// test('test regulateInput 1->0', () => {
// 	let input = m.regulateInput(0);
// 	console.log("TEST LOG: input = ", input);
// 	expect(input).toEqual(in_proto2);
// });

test('updateBistats', () => {
	// log("thresholds = "+m.thresholds);
	// log("weights = " + m.weights);
	let out = m.updateBistats(m.bistats, 2, true);
	// log("out = " + out);
	expect(out).toEqual(outThreshold2);
});

test('updateBistats 1->0', () => {
	// log("thresholds = "+m.thresholds);
	// log("weights = " + m.weights);
	let out = m.updateBistats(m.bistats, 1, false);
	// log("out = " + out);
	expect(out).toEqual(outThreshold1);
});

test('test to see if prototype overriding works', () => {
	// log("thresholds = "+ m.thresholds);
	// log("weights = " + m.weights);
	let out = m.update(1);
	// log("out = " + out);
	expect(out).toEqual(out_proto);
});

test('update 1->0', () => {
	// log("thresholds = "+ m.thresholds);
	// log("weights = " + m.weights);
	let out = m.update(0);
	// log("out = " + out);
	expect(out).toEqual(out_proto10);
});

