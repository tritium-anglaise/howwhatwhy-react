import React from 'react';
import PropTypes from 'prop-types';

import AdverbCounter from './AdverbCounter';

function AdverbCountList( props ) {
	return(
		<div id="count-container">
			<AdverbCounter isLoading={props.isLoading}
						   count={props.counts.howCount}
						   setFilter={props.setFilter}
						   currentFilter={props.currentFilter}>hows</AdverbCounter>
			&bull;
			<AdverbCounter isLoading={props.isLoading}
						   count={props.counts.whatCount}
						   setFilter={props.setFilter}
						   currentFilter={props.currentFilter}>whats</AdverbCounter>
			&bull;
			<AdverbCounter isLoading={props.isLoading}
						   count={props.counts.whyCount}
						   setFilter={props.setFilter}
						   currentFilter={props.currentFilter}>whys</AdverbCounter>
		</div>
	)
}

AdverbCountList.propTypes = {
	counts: PropTypes.object.isRequired,
	currentFilter: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	setFilter: PropTypes.func.isRequired
};

export default AdverbCountList;