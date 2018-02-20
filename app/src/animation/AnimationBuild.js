import Animation from "./Animation";
import {Vector3} from "three";

class AnimationBuild extends Animation {
	constructor({targetHealth}) {
		super();
		this.targetHealth = targetHealth;
	}

	onAttach(structure) {
		structure.structModel.material.transparent = true;
		structure.structModel.material.opacity = .2;
	}

	onDestroy(structure) {
		structure.world.renderer.scene.remove(this.emitter);
	}

	onUpdate(structure) {
		if(structure.health < this.targetHealth - 200) {
			if(structure.health < this.targetHealth - 250) {
				for(let i = 20; i--;) {
					structure.world.renderer.emitter.spawnParticle({
						position: new Vector3(structure.model.position.x, .5, structure.model.position.z),
						positionRandomness: .2,
						velocityRandomness: .8,
						color: 0x2196f3,
						color2: 0x2196f3,
						size: 20,
						sizeRandomness: .5,
						lifetime: 10,
						turbulence: .1
					});
				}
			}

			return true;
		}

		structure.structModel.material.opacity += .02;

		if(structure.health === this.targetHealth) {
			structure.structModel.material.opacity = 1;
			structure.structModel.material.transparent = false;
			return false;
		}

		return true;
	}

	get length() {
		return Infinity;
	}

	static get animationId() {
		return "structure.build";
	}
}

export default AnimationBuild;
