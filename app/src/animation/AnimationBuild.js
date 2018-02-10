import Animation from "./Animation";
import ParticleEmitter from "./ParticleEmitter";

import {Vector3} from "three";

class AnimationBuild extends Animation {
	constructor({targetHealth}) {
		super();
		this.targetHealth = targetHealth;
	}

	onAttach(structure) {
		const checkBoundary = (particle, key) => {
			let motionUpdate = 0;

			if(particle.position[key] > structure[key] + 5) {
				motionUpdate = -0.1;
			} else if (particle.position[key] < structure[key] - 5) {
				motionUpdate = 0.1;
			}

			particle.motion[key] += motionUpdate;
		};

		this.emitter = new ParticleEmitter(0x2196f3, 20);
		this.emitter.emit(
			new Vector3(structure.x, structure.y, structure.z), 20,
			(particle) => particle.motion.set(Math.random() / 2 - .25, Math.random() / 2 - .25, Math.random() / 2 - .25),
			(particle) => ['x', 'y', 'z'].forEach(k => checkBoundary(particle, k))
		);

		structure.model.children[0].material.transparent = true;
		structure.model.children[0].material.opacity = 0;

		structure.world.renderer.scene.add(this.emitter.particleSystem);
	}

	onDestroy(structure) {
		structure.world.renderer.scene.remove(this.emitter.particleSystem);
	}

	onUpdate(structure) {
		if(structure.health < this.targetHealth - 25) {
			this.emitter.update();
			return true;
		}

		structure.model.children[0].materials[0].opacity += .2;

		if(structure.health === this.targetHealth) {
			structure.model.children[0].materials[0].opacity = 1;
			structure.model.children[0].materials[0].transparent = false;
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
