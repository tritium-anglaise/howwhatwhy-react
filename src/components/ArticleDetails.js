import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Chart from './Chart';
import ArticleList from './ArticleList';
import AdverbCountList from './AdverbCountList';

class ArticleDetails extends Component {
	constructor(props) {
		super(props);

		this.setFilter = this.setFilter.bind(this);
	}

	state = {
		articleFilter: null
	};

	componentDidUpdate(prevProps) {
		// clear the article filter if we've loaded a new set of links
		if( prevProps.isLoading && !this.props.isLoading ){
		    this.setState({
				articleFilter: null
			})
		}
	}

	getAdverbCounts = () => {
		let headlines = this.props.list;

		return headlines.reduce( (acc, headline) => {
			if( headline.how ) acc.howCount = acc.howCount + 1;
			if( headline.what ) acc.whatCount = acc.whatCount + 1;
			if( headline.why ) acc.whyCount = acc.whyCount + 1;
			return acc;
		}, {howCount: 0, whatCount: 0, whyCount: 0});
	};

	getFilteredList() {
		if( this.state.articleFilter !== null ){
			// each array entry has how, what, and why boolean fields
			return this.props.list.filter((article) => {
				return article[this.state.articleFilter] === true;
			})
		} else {
			return this.props.list;
		}
	}

	setFilter(adverb) {
		if( adverb === this.state.articleFilter ){
		    this.setState({
				articleFilter: null
			})
		} else {
			this.setState({
				articleFilter: adverb
			});
		}
	};

	render() {
		return(
			<div id="deets">
				<Chart counts={this.getAdverbCounts()}
					   currentFilter={this.state.articleFilter}
					   setFilter={this.setFilter} />
				<div>
					<AdverbCountList isLoading={this.props.isLoading}
									 counts={this.getAdverbCounts()}
									 setFilter={this.setFilter}
									 currentFilter={this.state.articleFilter}/>
					<ArticleList className="article-wrap"
								 isLoading={this.props.isLoading}
								 list={this.getFilteredList()}/>
				</div>
			</div>);
	}
}

ArticleDetails.propTypes = {
	isLoading: PropTypes.bool.isRequired,
	list: PropTypes.array.isRequired
};

export default ArticleDetails;