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

		for(let i = 20; i--;) {
			structure.world.renderer.multiplyEmitter.spawnParticle({
				position: new Vector3(structure.model.position.x, .5, structure.model.position.z),
				positionRandomness: .1,
				velocityRandomness: .8,
				color: 0x808080,
				color2: 0xc0c0c0,
				colorRandomness: .1,
				size: 200,
				size2: 300,
				sizeRandomness: 1,
				lifetime: 6,
				turbulence: .1
			});

			structure.world.renderer.emitter.spawnParticle({
				position: new Vector3(structure.model.position.x, .5, structure.model.position.z),
				positionRandomness: .2,
				velocityRandomness: .8,
				color: 0xf57f17,
				color2: 0xf44336,
				colorRandomness: .1,
				size: 100,
				size2: 300,
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
