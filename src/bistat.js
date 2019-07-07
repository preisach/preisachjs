(function(exports) {
	/**
	 * 	@params t1, t2, x0, y0
	 * 		lower ]threshold, higher threshold, intiial input, initial output
	 * 	@returns
	 * 		meh, this should probably look like a class
	 */
	class bistat {
		constructor(t1 = 1.0/3.0, t2 = 2.0/3.0, x0 = 0, state0 = 0)  {
			this.low = t1;
			this.high = t2;
			this.input = x0;			
			// if (opts['weight']) {
				// this.weight = weight;
				// this.output = state0 * weight;
			this.output = state0;
			// this.output = update(x0); // just in case
		}

		/**
		 *
		 */
		update(x) { 
			this.input = x;
			if(x <= this.low) {
				this.output = 0;
			} else if (x >= this.high) {
				// if (this.weight){
				// 	this.output = this.weight;
				// } else {
				this.output = 1;
			} 
			return this.output;
		}
	}

	/**
	 * Could have used opts to overload bistat but then there is an extra check on every update
	 */
	class weighted_bistat extends bistat {
		constructor(t1 = 1.0/3.0, t2 = 2.0/3.0, x0 = 0, y0 = 0, weight = 1)  {
			super(t1, t2, x0, y0);
			this.weight = weight;		
		}
		update(x) {
			// this.output is the weighted output
			// we can maybe use separate 'state' and 'output'
			// return this.output = super.update(x) * this.weight;
			return super.update(x) * this.weight;
		}
	}

	exports.bistat = bistat;
	exports.weighted_bistat = weighted_bistat;

})( typeof exports === 'undefined' ? this['bistat'] = {}: exports );
