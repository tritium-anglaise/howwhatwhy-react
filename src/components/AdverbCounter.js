import React from 'react';
import PropTypes from 'prop-types';

function clickHandler(props) {
	let ctxt = props;

	return function(e) {
		ctxt.setFilter(e.target.dataset.adverb);
	}
}

function AdverbCounter( props ) {
	if( props.isLoading ){
	    return(
	    	<span><span className="pulse">?</span> {props.children}</span>
		)
	} else {
		return(
			<span onClick={clickHandler(props)}
				  className={props.currentFilter === props.children.slice(0,-1) ? 'active' : ''}
				  data-adverb={props.children.slice(0,-1)}>
				{props.count} {props.children}</span>
		)
	}
}

AdverbCounter.propTypes = {
	count: PropTypes.number,
	currentFilter: PropTypes.string,
	isLoading: PropTypes.bool.isRequired
};

export default AdverbCounter;