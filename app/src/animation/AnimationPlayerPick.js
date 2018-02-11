import Animation from "./Animation";

class AnimationPlayerPick extends Animation {
	constructor({targetPosition}) {
		super();
		this.position = targetPosition;
		this.theta = 0;
	}

	onAttach(entity) {
		this.theta = Math.atan2(
			(this.position.z - entity.model.position.z),
			(this.position.x - entity.model.position.x)
		);
	}

	onUpdate(entity) {
		if(this.tick < this.length / 2) {
			entity.model.position.x += Math.cos(this.theta) * 1;
			entity.model.position.z += Math.sin(this.theta) * 1;
		} else {
			entity.model.position.x -= Math.cos(this.theta) * 1;
			entity.model.position.z -= Math.sin(this.theta) * 1;
		}

		return true;
	}

	get length() {
		return 20;
	}

	static get animationId() {
		return "player.pick";
	}
}

export default AnimationPlayerPick;
