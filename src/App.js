import React, { Component } from 'react';
import ArticleDetails from './components/ArticleDetails';
import IntervalPanel from './components/IntervalPanel';

import getHeadlines from './fetch-handler';

class App extends Component {
	state = {
		interval: '8',
		loading: false,
		workingData: [],
		showIntervalPanel: false
	};

	fetchAndUpdateHeadlines = ( interval ) => {
		this.setState({ loading: true });

		getHeadlines( interval ).then(( headlines ) => {
			this.setState({
				loading: false,
				workingData: headlines
			});
		});
	};

	componentDidMount() {
		this.fetchAndUpdateHeadlines( this.state.interval );
	}

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
				<IntervalPanel currentInterval={this.state.interval}
							   clickHandler={this.intervalClickHandler}
							   togglePanelHandler={this.togglePanelVisibility}
							   intervalPanelIsHidden={this.state.showIntervalPanel} />
			</header>
			<ArticleDetails isLoading={this.state.loading}
							list={this.state.workingData}
							counts={[this.state.howCount, this.state.whatCount, this.state.whyCount]} />

		</div>
    );
  }
}

export default App;
