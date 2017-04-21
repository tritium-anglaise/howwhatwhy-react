import React from 'react';
import ArticleItem from './ArticleItem';

function ArticleList( {list} ) {
	if( list.length === 0 ){
	    return(
	    	<div>No adverbs to see here. It's probably early.</div>
		)
	} else {
		return(
			<ul className="article-list">
				{list.map((item) => {
					if(item.href !== null && item.linktext !== null){
						return <ArticleItem key={item.id} href={item.href} linktext={item.linktext} />
					}
				})}
			</ul>
		)
	}
}

export default ArticleList;