import React from 'react';
import PropTypes from 'prop-types';
import getAdverbCounts from '../util/adverb-counter';

function SummaryDisplay({ list }) {
	var counts = getAdverbCounts( list ),
		tie = null,
		trailingCharacter,
		pluralise = function( adverb ) {
			trailingCharacter = adverb.matches > 1 || adverb.matches === 0 ? 's' : '';
			adverb.matches = adverb.matches === 0 ? 'no' : adverb.matches;

			return `${adverb.matches} ${adverb.adverb}${trailingCharacter}`;
		};

	if (counts[0].matches === counts[1].matches && counts[0].matches === counts[2].matches) {
		tie = 3;
	} else if (counts[0].matches === counts[1].matches) {
		tie = 2;
	}

	if (counts[0].matches === 0) {
		return(
			<div id="summary-container">
				<h1>N/A</h1>
				<div id="counts">(it must be early)</div>
			</div>
		);
	} else if( tie !== null ) {
		return(
			<div id="summary-container">
				a {tie === 2 ? 'two way' : 'three way'} tie between
				<h1>{counts.map((item) => { return item.adverb }).slice(0, tie).join(' & ')}</h1>
				<div id="counts">({pluralise(counts[0])}, {pluralise(counts[1])}, and {pluralise(counts[2])})</div>
			</div>
		);
	} else {
		return(
			<div id="summary-container">
				<h1>{counts[0].adverb}</h1>
				<div id="counts">({pluralise(counts[0])}, {pluralise(counts[1])}, and {pluralise(counts[2])})</div>
			</div>
		);
	}
}

SummaryDisplay.propTypes = {
	list: PropTypes.array.isRequired,
	range: PropTypes.number.isRequired
};

export default SummaryDisplay;