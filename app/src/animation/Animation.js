class Animation {
	constructor() {
		this.id = this.constructor.animationId;
		this.tick = 0;
	}

	onAttach(object) {

	}

	onUpdate(object, context) {

	}

	onDestroy(object, context) {

	}

	attach(object) {
		this.object = object;
		this.onAttach(object);
	}

	update(object, context) {
		this.tick++;

		if(this.tick > this.length) {
			this.onDestroy(object, context);
			return false;
		}

		const returnVal = this.onUpdate(object, context);

		if(!returnVal) this.onDestroy(object, context);
		return returnVal;
	}

	get length() {
		return 0;
	}

	static get animationId() {
		return "id";
	}
}

export default Animation;
