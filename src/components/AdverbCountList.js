import React from 'react';
import PropTypes from 'prop-types';

import AdverbCounter from './AdverbCounter';

function AdverbCountList( props ) {
	return(
		<div id="count-container">
			<AdverbCounter isLoading={props.isLoading} count={props.howCount}>hows</AdverbCounter>
			&bull;
			<AdverbCounter isLoading={props.isLoading} count={props.whatCount}>whats</AdverbCounter>
			&bull;
			<AdverbCounter isLoading={props.isLoading} count={props.whyCount}>whys</AdverbCounter>
		</div>
	)
}

AdverbCountList.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	howCount: PropTypes.number.isRequired,
	whatCount: PropTypes.number.isRequired,
	whyCount: PropTypes.number.isRequired
};

export default AdverbCountList;