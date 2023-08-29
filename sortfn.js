function order (isAscending = true, isNumber = false, prefix = '', suffix = '') {
	let [a, b] = [['A', 'a'], ['B', 'b']].map(e => `${prefix ? prefix + e[0] : e[1]}${suffix}`);
	return isNumber ? `if (${a} !== ${b}) return ${isAscending ? a : b} - ${isAscending ? b : a};` : `if (${a} ${isAscending ? '<' : '>'} ${b}) return -1;
	if (${a} ${isAscending ? '>' : '<'} ${b}) return 1;`;
};

function orderedString (isAscending = true, prefix = '', suffix = '') {
	let [a, b] = [['A', 'a'], ['B', 'b']].map(e => `${prefix ? prefix + e[0] : e[1]}${suffix}`);
	return `let iA = iB = 0;
	let sA, sB;
	do {
		const f = (i, s) => /(\\d+|\\D*)/.exec(s.substring(i))[1];
		[iA, iB] = [iA, iB].map((e, i) => e + [sA = f(iA, ${a}), sB = f(iB, ${b})][i].length);
		if (/\\d/.test(sA) && /\\d/.test(sB)) {
			const [nA, nB] = [sA, sB].map(e => e - 0);
			${order(isAscending, true, 'n')}
		} else {
			${order(isAscending, false, 's')}
		}
	} while (sA && sB);`;
};

const sort = (array, criteria) => {
	const isArray = Array.isArray(criteria);
	return isArray && criteria.reduce((a, c) => (a && !Array.isArray(c) && typeof c === 'object'), true) ? Function('a', `return a.sort((a, b) => {
		${criteria.map(e => Function('a', `return ${e.fn}(...a.args);`)(e)).join('\n')}
		return 0;
	});`)(array) : null;
};
