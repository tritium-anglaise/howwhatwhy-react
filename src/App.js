import React from 'react';
import ArticleList from './components/ArticleList';
import FetchHandler from './util/FetchHandler';
import IntervalSelector from './components/IntervalSelector';
import LoadingOverlay from './components/LoadingOverlay';
import SummaryDisplay from './components/SummaryDisplay';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.getHeadlines = new FetchHandler().getHeadlines.bind(this);

		this.state = {
			// all three of these are mutated by FetchHandler
			interval: 0,
			loading: false,
			workingData: window.todaysData === undefined ? [] : window.todaysData
		};
	}

	render() {
		return (
			<div className="App">
				<header>
					<IntervalSelector handler={this.getHeadlines}/> most popular adverb on <a href="http://news.ycombinator.com">news.ycombinator.com</a> is
					<SummaryDisplay list={this.state.workingData} range={this.state.interval} />
				</header>
				<div id="list-wrap">
					<ArticleList className="article-wrap" list={this.state.workingData} />
					<LoadingOverlay show={this.state.loading}/>
				</div>
			</div>
		);
	}
}

export default App;