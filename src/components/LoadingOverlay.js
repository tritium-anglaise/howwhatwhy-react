import React from 'react';

function LoadingOverlay(props) {
	return(
		<div id="overlay" className={props.show ? '' : 'hidden'}>
			<img src="/img/loading.gif" alt="" />
		</div>
	)
}

export default LoadingOverlay;