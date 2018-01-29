import React from 'react';
import PropTypes from 'prop-types';
import IntervalSelector from './IntervalSelector';

const intervalMap = {
	winter: {label: 'winter 2017', key: 500}, spring: {label: 'spring 2017', key: 501},
	summer: {label: 'summer 2017', key: 502}, '11': {label: 'november 2016', key: 503},
	'12': {label: 'december 2016', key: 504}, '1': {label: 'january 2017', key: 505},
	'2': {label: 'february 2017', key: 506}, '3': {label: 'march 2017', key: 507},
	'4': {label: 'april 2017', key: 508}, '5': {label: 'may 2017', key: 509},
	'6': {label: 'june 2017', key: 510}, '7': {label: 'july 2017', key: 511},
	'8': {label: 'august 2017', key: 512}, 'all': {label: 'recorded history', key: 512}
};

function returnIntervalSelector(props, val) {
	return <IntervalSelector key={intervalMap[val].key}
					  interval={val}
					  clickHandler={props.clickHandler}
					  currentInterval={props.currentInterval}>{intervalMap[val].label}</IntervalSelector>
}

function IntervalPanel(props) {
	return <div id="interval-container">
		<div>in&nbsp;<span id="interval-selector" onClick={props.togglePanelHandler}>{intervalMap[props.currentInterval].label}⋎</span></div>
		<div id="interval-select-panel" className={props.intervalPanelIsHidden ? '' : 'hidden'}>
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
		</div>
		<span id="interval-instructions" data-verb-mobile="(Tap " data-verb="(Click ">the underlined bit to select a different month/time frame, and then on the chart or adverb counts to filter further.)</span>
	</div>;
}

IntervalPanel.propTypes = {
	currentInterval: PropTypes.string.isRequired,
	intervalPanelIsHidden: PropTypes.bool.isRequired,
};

export default IntervalPanel;