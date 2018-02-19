import Animation from "./Animation";

import {Clock, Vector3} from "three";

class AnimationDestruction extends Animation {
	constructor({targetHealth}) {
		super();
	}

	onAttach(structure) {
		structure.structModel.material.transparent = true;
	}

	onUpdate(structure) {

		for(let i = 100; i--;) {
			structure.world.renderer.emitter.spawnParticle({
				position: new Vector3(structure.model.position.x, .5, structure.model.position.z),
				positionRandomness: .2,
				velocityRandomness: .8,
				color: 0x2196f3,
				color2: 0x202020,
				size: 50,
				sizeRandomness: .5,
				lifetime: 10,
				turbulence: .1
			});
		}
		structure.structModel.material.opacity -= .2;

		return true;
	}

	onDestroy(structure, context) {
		structure.world.renderer.scene.remove(structure.model);
	}

	get length() {
		return 6;
	}

	static get animationId() {
		return "structure.destruct";
	}
}

export default AnimationDestruction;
