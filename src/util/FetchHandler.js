import React from 'react';
import 'whatwg-fetch';
import headlineCache from './local-cache-manager';

const HEADLINE_ENDPOINT = '//howwhatwhy.herokuapp.com/api/headlines/';

class FetchHandler extends React.Component {
	constructor(props) {
		super(props);

		if( window.todaysData ){
			headlineCache.set(0, window.todaysData);
		}
	}

	getHeadlines(e) {
		let _interval = parseInt( e.target.value, 10 ),
			_cachedData = headlineCache.get(_interval);

		this.setState({
			interval: _interval,
		});

		if( _cachedData ){
			this.setState({
				workingData: _cachedData
			});

			return _cachedData;
		} else {
			this.setState({
				loading: true
			});

			fetch(HEADLINE_ENDPOINT + _interval)
				.then(( response ) => {
					return response.json();
				}).then(( data ) => {
					headlineCache.set( this.state.interval, data );
					this.setState({
						loading: false,
						workingData: data
					});
			});
		}
	};
}

export default FetchHandler;