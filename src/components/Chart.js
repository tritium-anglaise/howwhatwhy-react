import React, {Component} from 'react';
import Highcharts from 'highcharts';
import PropTypes from 'prop-types';

class Chart extends Component {
	constructor(props) {
		super(props);

		this.setFilter = this.props.setFilter.bind(this);

		this.chartClickInitiatedFilterChange = true;
	}

	setChartData() {
		return [{
			data: [{ name: 'hows', y: this.props.counts.howCount},
				{ name: 'whats', y: this.props.counts.whatCount},
				{ name: 'whys', y: this.props.counts.whyCount}]
		}]
	}

	bindSetFilter() {
		let ctxt = this;

		return function() {
			ctxt.chartClickInitiatedFilterChange = true;
			ctxt.setFilter(this.name.slice(0,-1));
		};
	}

	componentDidMount() {
		this.chart = Highcharts.chart('chart-container', {
			chart: {
				height: '100%',
				type: 'pie',
				spacing: [0,0,0,0],
				style: {
					fontFamily: "'Imprint MT Shadow', 'American Typewriter', Courier, serif"
				},
			},
			title: {
				text: null
			},
			xAxis: {
				categories: ['Hows', 'Whats', 'Whys']
			},
			series: this.setChartData(),
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						color: '#333333',
						enabled: true,
						format: '{point.name}<br>{point.percentage:.0f}%',
						distance: -75,
						style: {
							fill: 'none',
							fontSize: '2rem',
							fontWeight: 200,
							textOutline: 'none'
						},
						y: -25
					},
					tooltip: {
						headerFormat: null,
						pointFormat: 'Click to filter by {point.name}.'
					},
					point: {
						events: {
							click: this.bindSetFilter()
						}
					},
					series: {
						allowPointSelect: true
					}
				}
			},
			//styling for mobile screens
			responsive: {
				rules: [{
					condition: {
						maxWidth: 400
					},
					chartOptions: {
						plotOptions: {
							pie: {
								dataLabels: {
									distance: -45,
									y: -28
								}
							}
						}
					}
				}]
			},
		})
	};

	componentDidUpdate() {
		this.chart.update({
			series: this.setChartData()
		});

		/*
			This monstrosity allows us to filter the link list by clicking
			segments of the pie chart as well as the adverb counts above the
			list AND have the pie chart show the correct 'selected' display.

			Briefly, when interacting with the chart itself it's necessary to
			juggle state with .setState('select') (for adverb count clicks) and
			.setState('') (for pie chart clicks). When the chart is reacting
			to a prop change initiated by the counts, using .select(true|false) is
			the way to go.
		 */

		if( this.props.currentFilter === null ) {
			let points = this.chart.series[0].data;

			if( this.chartClickInitiatedFilterChange ){
			    this.chartClickInitiatedFilterChange = false;
				points.forEach(x => {
					if( x.selected ) {
						x.setState('');
					}
				});
			} else {
				points.forEach(x => {
					if( x.selected ) {
						x.select(false);
					}
				});
			}
		} else {
			let point = this.chart.series[0].data.find(
				x => x.name === `${this.props.currentFilter}s`
			);

			if( this.chartClickInitiatedFilterChange ) {
				this.chartClickInitiatedFilterChange = false;
				if(point.selected){
					point.setState('select');
				} else {
					point.setState('');
				}
			} else {
				this.chartClickInitiatedFilterChange = false;
				point.select(true);
			}
		}
	}

	render() {
		return(
			<div id="chart-container"></div>
		)
	}
}

Chart.propTypes = {
	counts: PropTypes.object.isRequired,
	currentFilter: PropTypes.string,
	setFilter: PropTypes.func.isRequired
};

export default Chart;