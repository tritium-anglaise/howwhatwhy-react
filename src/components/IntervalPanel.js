import React from 'react';
import PropTypes from 'prop-types';
import IntervalSelector from './IntervalSelector';

function returnIntervalSelector(props, val) {
	return <IntervalSelector key={props.intervalMap[val].key}
					  interval={val}
					  clickHandler={props.clickHandler}
					  currentInterval={props.currentInterval}>{props.intervalMap[val].label}</IntervalSelector>
}

function IntervalPanel(props) {
	return <div id="interval-select-panel" className={props.intervalIsHidden ? '' : 'hidden'}>
		<div>
			<strong>by season</strong>
			{['winter','spring','summer'].map((val) => returnIntervalSelector(props, val) )}
		</div>
		<div>
			<strong>by month</strong>
			{['11','12','1','2','3','4','5','6','7','8'].map((val) => returnIntervalSelector(props, val) )}
		</div>
		<div>
			<IntervalSelector interval={'all'} clickHandler={props.clickHandler} currentInterval={props.currentInterval}>let's see it all!</IntervalSelector>
			<img src="/img/athena-sm-gray.png" alt="" />
		</div>
	</div>;
}

IntervalPanel.propTypes = {
	// currentInterval: PropTypes.string.isRequired,
	// intervalIsHidden: PropTypes.boolean.isRequired,
	intervalMap: PropTypes.object.isRequired
};

export default IntervalPanel;