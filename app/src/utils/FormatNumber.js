// From https://stackoverflow.com/questions/9461621

// Should be sorted in descending order.
const siPrefix = [
	{ value: 1e18, symbol: 'E' },
	{ value: 1e15, symbol: 'P' },
	{ value: 1e12, symbol: 'T' },
	{ value: 1e9, symbol: 'G' },
	{ value: 1e6, symbol: 'M'},
	{ value: 1e3, symbol: 'k'},
	{ value: 1, symbol: ''}
];

export default n => {
	let result = `${n}`;

	siPrefix.every(v => {
		if(n > v.value) {
			result = `${Math.floor(n / v.value)}${v.symbol}`;
			return false;
		}

		return true;
	});

	return result;
};
