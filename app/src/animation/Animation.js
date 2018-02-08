class Animation {
	constructor() {
		this.id = this.constructor.animationId;
		this.tick = 0;
	}

	onAttach(ent) {

	}

	onUpdate(entity, context) {

	}

	attach(ent) {
		this.entity = ent;
		this.onAttach(ent);
	}

	update(entity, context) {
		this.tick++;

		if(this.tick > this.length) {
			return false;
		}

		return onUpdate(entity, context);
	}

	get length() {
		return 0;
	}

	static get animationId() {
		return "id";
	}
}

export default Animation;
