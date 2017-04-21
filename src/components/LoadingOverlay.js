import React from 'react';
import PropTypes from 'prop-types';

function LoadingOverlay({show}) {
	if ( show ){
		return(
			<div id="overlay">
				<img src="/img/loading.gif" alt="" />
			</div>
		)
	} else {
		return null;
	}
}

LoadingOverlay.propTypes = {
	show: PropTypes.bool.isRequired
};

export default LoadingOverlay;