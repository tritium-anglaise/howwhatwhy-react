import 'whatwg-fetch';

const returnRemoteURI = ( interval ) => {
	let apiPath = '/api/headlines?month=';

	if( window.location.host !== 'localhost' ){
		return '//howwhatwhy.herokuapp.com' + apiPath + interval;
	} else {
		return '//localhost:5900' + apiPath + interval;
	}
};
const LOCAL_ENDPOINT = window.location.protocol + '//' + window.location.host;
const returnLocalURI = ( asset ) => LOCAL_ENDPOINT + '/json/' + asset + '.json';
const returnRequestUri = ( interval ) =>{
	let requestURI;

	//TODO: switch?
	if( interval === 'all' ){
	    requestURI = returnLocalURI( interval );
	} else if( isNaN( parseInt( interval, 10 )) === false ) {
		requestURI = returnRemoteURI( interval );
	} else if ( interval === 'winter' || interval === 'spring' || interval === 'summer') {
		requestURI = returnLocalURI(interval);
	} else {
		return false;
	}

	return requestURI;
};

const getHeadlines = ( interval ) => {
	return new Promise(
		( resolve, reject ) => {
			fetch( returnRequestUri( interval ) )
				.then(( response ) => {
					resolve(
						// headlineCache.set( this.state.interval, data );
						response.json()
					);
				})
		}
	)
};

export default getHeadlines;