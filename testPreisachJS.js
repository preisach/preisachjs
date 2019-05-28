/**
 *
 * 	TODO
 * 		write **automatic** tests
 *
 */

/**
 *
 * How do you test functions that are not exposed to node?
 *	expose, test, hide??
 *
 */

var p = require('./preisach.js');
var pu = require('./preisach_utils.js');
console.log(p)
// console.log(p.output)

// test_Thermostat();
// test_initThresholds();
// test_saturated();
// test_initStates();
// test_initWeights();
// test_initThermostats();
// test_regulateInput();
// test_Discrete();
test_createAllCombos();

function test_initWeights() {
	// this is kind of sad
	let thresholds = p.initThresholds(0, 1, 2);
	let weights = new p.initWeights().uniformWeights(thresholds);
	console.log("weights = ", weights);
}

function test_regulateInput() {
	let thresholds = p.initThresholds(0, 1, 2);
	let thermostats = p.initThermostats(thresholds);
	// console.log('thersholds = ', thresholds);
	// console.log('thermostats = ', thermostats);
	let d = new p.discrete(thresholds, thermostats, 0, 0);
	let inputSteps = d.regulateInput(1);
	console.log("inputs [0, 1] = ", inputSteps);
}

function test_Discrete() {
	// let thresholds, thermostats;
	let thresholds = p.initThresholds(0, 1, 2);
	console.log('thersholds = ', thresholds);
	/*
		n = 5, thresholds = [ 0.14285714285714285,
								0.2857142857142857,
								0.42857142857142855,
								0.5714285714285714,
								0.7142857142857142,
								0.8571428571428571 ]
	*/
	let x0 = 1;
	let states = new p.initStates().saturated(thresholds, 1);
	let thermostats = p.initThermostats(thresholds, x0, states);
	// console.log('thermostats = ', thermostats);
	let weights = new p.initWeights().uniformWeights(thresholds);
	// console.log("weights = ", weights);
	
	let y0 = 1;
	let d = new p.discrete(thresholds, thermostats, weights, x0, y0);
	// console.log('d = ', d);

	// regulateInput should perhaps be a private method, 
	// but it is nice to be able to test it directly too
	let inputSteps = d.regulateInput(0);
	console.log("inputs [1, 0] = ", inputSteps);

	let io = d.update(0);
	console.log("[inputSteps, outputSteps] = ", io);
	// console.log(d.update(0));
	// console.log(d.output);
}

function test_initThresholds() {
	let thresholds = p.initThresholds(0, 1, 4);
	console.log(thresholds);
}

function test_saturated() {
	let thresholds = p.initThresholds(0, 1, 2);
	let states = new p.initStates().saturated(thresholds, 0);
	console.log("states = ", states);

}

function test_initThermostats() {
	let thresholds = p.initThresholds(0, 1, 2);
	let x0 = 1;
	let states = new p.initStates().saturated(thresholds, 1);
	let thermostats = p.initThermostats(thresholds, x0, states);
	console.log("Thermostats = ", thermostats);
	for (let t of thermostats) {
		console.log("Threshols = ", t.low, t.high);
	}
} 

function test_Thermostat() {
	console.log("test_Thermostat");
	let r = new p.thermostat(0.25, 0.75, 0, 0);
	console.log(r);
	// return this.updateThermostat(x); }
			// console.log('input = ', x);
			// console.log('THIS thermostat = ', this);
			// console.log('low = ', this.low);
			// console.log('high = ', this.high);

	// console.log(r.output);
	console.log(r.update(1));
	// console.log(r.output);

				// console.log('turn ON');
			// else { console.log('thermostat FUN...no change this update'); }

	console.log(r.update(0));
	// console.log(r.output);
	r.update(1);
	console.log(r.output);
	r.update(0);
	console.log(r.output);
	console.log(r);
}

function test_createAllCombos() {
	let thresholds, thermostats;
	let sizes = [1, 2]; //, 3, 5, 10, 20];
	// for ...
	for (let i of sizes) {
		thresholds = p.initThresholds(0, 1, i);
		console.log('THRESHOLDS = ', thresholds);
		
		let states = p.initStates(thresholds, 'saturated', 0);	
		// console.log('states = ', states);
		
		thermostats = p.initThermostats(thresholds, 0, states);
		// thermostats = p.initThermostatsNL(thresholds);
		// console.log('thermostats = ', thermostats);
		
		let weights = p.initWeights(thresholds, 'uniform');
		// let weights = p.initWeights.uniformWeights(thresholds);
		
		let d = new p.discrete(thresholds, thermostats, weights, 0, 0);

		console.log("WEIGHTS = ", d.weights);
		let combos = pu.createAllCombos(d);
		console.log("combos = ", combos);
		// plot with pyplot, upload to discrete preisach on wikipedia
	}
}