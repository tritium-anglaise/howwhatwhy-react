import React, { Component } from 'react';
import AdverbCountList from './components/AdverbCountList';
import ArticleList from './components/ArticleList';
import IntervalPanel from './components/IntervalPanel';

import getHeadlines from './fetch-handler';


class App extends Component {
	state = {
		howCount: 0,
		whatCount: 0,
		whyCount: 0,
		interval: '8',
		loading: false,
		workingData: [],
		showIntervalPanel: false
	};

	componentDidMount() {
		this.fetchAndUpdateHeadlines( this.state.interval );
	}

	updateAdverbCounts = ( headlines ) => {
		this.setState({ howCount: 0, whatCount: 0, whyCount: 0 });

		headlines.forEach((val) => {
			if( val.how ) this.setState({howCount: this.state.howCount + 1});
			if( val.what ) this.setState({whatCount: this.state.whatCount + 1});
			if( val.why ) this.setState({whyCount: this.state.whyCount + 1});
		});
	};

	fetchAndUpdateHeadlines = ( interval ) => {
		this.setState({ loading: true });

		getHeadlines( interval ).then(( headlines ) => {
			this.setState({
				loading: false,
				workingData: headlines
			});
		}).then(() => {
			this.updateAdverbCounts( this.state.workingData );
		});
	};

	intervalMap = {
		winter: {label: 'winter 2017', key: 500}, spring: {label: 'spring 2017', key: 501},
		summer: {label: 'summer 2017', key: 502}, '11': {label: 'november 2016', key: 503},
		'12': {label: 'december 2016', key: 504}, '1': {label: 'january 2017', key: 505},
		'2': {label: 'february 2017', key: 506}, '3': {label: 'march 2017', key: 507},
		'4': {label: 'april 2017', key: 508}, '5': {label: 'may 2017', key: 509},
		'6': {label: 'june 2017', key: 510}, '7': {label: 'july 2017', key: 511},
		'8': {label: 'august 2017', key: 512}, 'all': {label: 'recorded history', key: 512}
	};

	togglePanelVisibility = () => {
		this.setState({
			showIntervalPanel: !this.state.showIntervalPanel
		});
	};

	intervalClickHandler = (e) => {
		let interval = e.target.dataset.interval;
		this.setState({ interval: interval });
		this.fetchAndUpdateHeadlines(interval);
	};

	noOp = () => {};

  render() {
    return (
		<div id="app" onClick={this.state.showIntervalPanel ? this.togglePanelVisibility : this.noOp}>
			<header>
				<h3>the most popular adverbs on</h3>
				<h4 id="citation-needed">
					<span className="y">Y</span> Hacker News<span className="asterisk" title="for a period of ten months, anyway.">&#42;</span>
				</h4>

				<AdverbCountList isLoading={this.state.loading} howCount={this.state.howCount} whatCount={this.state.whatCount} whyCount={this.state.whyCount}/>
				<div id="foobar">
					<div>in&nbsp;<span id="interval-selector" onClick={this.togglePanelVisibility}>{this.intervalMap[this.state.interval].label}&#8910;</span></div>
					<IntervalPanel currentInterval={this.state.interval}
								   clickHandler={this.intervalClickHandler}
								   intervalIsHidden={this.state.showIntervalPanel}
								   intervalMap={this.intervalMap} />
				</div>
			</header>
			<ArticleList className="article-wrap" isLoading={this.state.loading} list={this.state.workingData} />
		</div>
    );
  }
}

export default App;
