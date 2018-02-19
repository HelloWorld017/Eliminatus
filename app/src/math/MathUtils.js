export default {
	mod(n, n2) {
		return ((n % n2) + n2) % n2;
	},

	clamp(min, val, max) {
		return Math.max(min, Math.min(val, max));
	}
};
