let headlineCache = {
	_hasWorkingCache: null,
	hasWorkingLocalStorage: function() {
		if( this._hasWorkingCache !== null ){
		    return this._hasWorkingCache;
		} else {
			// test to see if the client is using Safari in private mode
			try {
				localStorage.setItem('beep', 'bop');
				localStorage.removeItem('beep');
				this._hasWorkingCache = true;
			}

			catch (e) {
				this._hasWorkingCache = false;
				return false;
			}

			return true;
		}
	},
	get: function( interval ) {
		/*
			The interval itself (eg, 0, 7, 14, etc) is the key for the stored JSON.
			'last-0', 'last-7', etc, are the keys for the timestamp at which the JSON, above, was last stored.
		 */
		if( this.hasWorkingLocalStorage() ){
			let now = Date.now(),
				lastIntervalPopulated = parseInt( localStorage.getItem('lastSet-' + interval), 10),
				timeDiff = isNaN( lastIntervalPopulated ) ? null : (now - lastIntervalPopulated) / 60000;

			if( timeDiff === null || timeDiff > 60 ){
				return null;
			} else {
				return JSON.parse( localStorage.getItem(interval) );
			}
		} else {
			return null;
		}
	},
	set: function( interval, data ) {
		if( this.hasWorkingLocalStorage() ){
			localStorage.setItem('lastSet-' + interval, Date.now());
			localStorage.setItem(interval, JSON.stringify(data));
		}
	}
};

export default headlineCache;