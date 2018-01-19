import React from 'react';
import PropTypes from 'prop-types';

function AdverbCounter( props ) {
	if( props.isLoading ){
	    return(
	    	<span><span className="throb">?</span> {props.children}</span>
		)
	} else {
		return(
			<span>{props.count} {props.children}</span>
		)
	}
}

AdverbCounter.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	count: PropTypes.number
};

export default AdverbCounter;