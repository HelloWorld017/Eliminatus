class KeyboardInput {
	constructor() {
		this.eventQueue = [];
		this.pressingKeys = new Map();

		this.attachListener('keydown', (key) => this.pressingKeys.set(key, true));
		this.attachListener('keyup', (key) => this.pressingKeys.set(key, false));

		this.handler = this._handler.bind(this);
	}

	attachListener(listenerName, callback) {
		window.addEventListener(listenerName, (evt) => {
			let {key, ctrlKey, shiftKey, altKey, metaKey} = evt;

			if(metaKey) key = 'meta-' + key;
			if(altKey) key = 'alt-' + key;
			if(shiftKey) key = 'shift-' + key;
			if(ctrlKey) key = 'ctrl-' + key;
			key = key.toLowerCase();

			callback(key);

			this.eventQueue.push({
				type: `keyboard:${listenerName}`,
				key
			});

			evt.preventDefault();
		}, false);
	}

	_handler(game, ctx) {
		ctx.keyboard = {
			events: this.eventQueue,
			pressingKeys: this.pressingKeys
		};

		this.eventQueue = [];
	}
}

export default KeyboardInput;
