import React from 'react';
import PropTypes from 'prop-types';

function IntervalSelector(props) {
	return(
		<span onClick={props.clickHandler}
			  data-interval={props.interval}
			  className={props.interval === props.currentInterval ? 'selected' : ''}>
			{props.children}
		</span>
	);
}

IntervalSelector.propTypes = {
	currentInterval: PropTypes.string.isRequired,
	interval: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	]).isRequired
};

export default IntervalSelector;