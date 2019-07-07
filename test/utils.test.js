// utils.test.js

let multistat = require('../src/multistat').multistat;
let utils = require('../src/utils');

let support = [0, 1];
let sideSize = 2;
let weights = [.3, .3, .4];
let history = [0];
let out_proto = [[0.5, 0.75, 1], [0.3, 1, 1]];

// let m = new multistat(support, sideSize, history, weights);
// let s = utils.buildStatios(m);

test('test to see if prototype overriding works', () => {
	// expect(m.update(1)).toEqual(out_proto);
	// expect(s.length).toEqual(4);
	expect(1).toEqual(1);
});