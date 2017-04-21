const getAdverbCounts = ( headlines )=> {
	var headline,
		matches = { "how": 0, "what": 0, "why": 0 },
		regex,
		regexes = {
			// only match 'how' when it's at the beginning of the string or part
			// of 'here's how' which can appear anywhere.
			how: /^(h|H)ow|((H|h)ere's) (h|H)ow/,
			what: /\b(W|w)hat\b/,
			why: /\b(W|w)hy\b/
		};

	for( headline of headlines ) {
		for( regex in regexes ) {
			if( regexes[ regex ].test( headline.linktext ) ){
				matches[ regex ]++;
			}
		}
	}

	return Object.keys(matches).map((foo)=> {
		return { adverb: foo, matches: matches[foo] }
	}).sort((a,b) => {
		return b.matches - a.matches;
	});
};

export default getAdverbCounts;