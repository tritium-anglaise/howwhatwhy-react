import React from 'react';
import PropTypes from 'prop-types';

function ArticleItem(props) {
	return(
		<li><a href={props.href} target="_blank">{props.linktext}</a></li>
	)
}

ArticleItem.propTypes = {
	href: PropTypes.string.isRequired,
	linktext: PropTypes.string.isRequired
};

export default ArticleItem;