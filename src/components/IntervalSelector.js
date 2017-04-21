import React from 'react';
import PropTypes from 'prop-types';

function IntervalSelector({handler}) {
	return(
		<span id="interval-wrap">
			<select onChange={handler}>
				<option value="0">today's</option>
				<option value="7">the past week's</option>
				<option value="30">the past 30 days'</option>
				<option value="60">the past 60 days'</option>
			</select>
			<span className="fa fa-chevron-down" />
		</span>
	);
}

IntervalSelector.propTypes = {
	handler: PropTypes.func.isRequired
};

export default IntervalSelector;