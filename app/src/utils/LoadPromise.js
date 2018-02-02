export default (loader, path) => new Promise((resolve, reject) => {
	loader.load(path, resolve, () => {} , reject);
});
