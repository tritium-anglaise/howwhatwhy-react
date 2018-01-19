import React from 'react';
import PropTypes from 'prop-types';

import IntervalPanel from './IntervalPanel';

class IntervalDisplay extends React.Component {
	constructor(props) {
		super(props);
	}

	intervalMap = {
		winter: {label: 'winter 2017', key: 500}, spring: {label: 'spring 2017', key: 501},
		summer: {label: 'summer 2017', key: 502}, '11': {label: 'november 2016', key: 503},
		'12': {label: 'december 2016', key: 504}, '1': {label: 'january 2017', key: 505},
		'2': {label: 'february 2017', key: 506}, '3': {label: 'march 2017', key: 507},
		'4': {label: 'april 2017', key: 508}, '5': {label: 'may 2017', key: 509},
		'6': {label: 'june 2017', key: 510}, '7': {label: 'july 2017', key: 511},
		'8': {label: 'august 2017', key: 512}, 'all': {label: 'recorded history', key: 512}
	};

	render() {
		return(
			<div id="foobar">
				<div>in&nbsp;<span id="interval-selector" onClick={this.props.clickHandler}>
				{this.intervalMap[this.props.currentInterval].label}&#8910;</span>
				</div>
				<IntervalPanel currentInterval={this.props.currentInterval}
							   clickHandler={this.props.clickHandler}
							   intervalIsHidden={this.props.intervalIsHidden}
							   intervalMap={this.intervalMap}/>
			</div>
		)
	}
}

IntervalDisplay.propTypes = {
	clickHandler: PropTypes.func.isRequired,
	currentInterval: PropTypes.string.isRequired,
	intervalIsHidden: PropTypes.bool.isRequired
};

export default IntervalDisplay;