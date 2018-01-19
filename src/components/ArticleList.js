import React from 'react';
import PropTypes from 'prop-types';

function ArticleList(props) {
	return(
		<div id="list-wrap" className={props.isLoading ? 'loading' : ''}>
			<img id="loading-img" src="/img/loading.gif" alt="" />
			<ul className="article-list">
				{ props.list.map((item) => {
					return <li key={item.id}>
						<a href={item.href} target="_blank">{item.linktext}</a>
					</li>
				})}
			</ul>
		</div>
	)
}

ArticleList.propTypes = {
	isLoading: PropTypes.bool.isRequired
};

export default ArticleList;