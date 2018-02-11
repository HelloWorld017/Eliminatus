import Animation from "./Animation";
import ParticleEmitter from "../graphics/GPUParticleSystem";
import ParticleTextures from "./ParticleTextures";

import {Clock, Vector3} from "three";

class AnimationBuild extends Animation {
	constructor({targetHealth}) {
		super();
		this.targetHealth = targetHealth;
		this.clock = new Clock;
		this.tick = 0;
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

		this.emitter = new ParticleEmitter({
			maxParticles: 1000,
			particleNoiseTex: ParticleTextures.particle.perlin,
			particleSpriteTex: ParticleTextures.particle.particle
		});

		structure.model.children[0].material.transparent = true;
		structure.model.children[0].material.opacity = .2;

		structure.world.renderer.scene.add(this.emitter);
	}

	onDestroy(structure) {
		structure.world.renderer.scene.remove(this.emitter);
	}

	onUpdate(structure) {
		if(structure.health < this.targetHealth - 200) {

			const delta = this.clock.getDelta();
			this.tick += delta;

			this.emitter.update(this.tick);

			if(structure.health < this.targetHealth - 250) {
				for(let i = 50; i--;) {
					this.emitter.spawnParticle({
						position: new Vector3(structure.model.position.x, .5, structure.model.position.z),
						positionRandomness: .2,
						velocityRandomness: .8,
						color: 0x2196f3,
						size: 20,
						sizeRandomness: .5,
						lifetime: 10,
						turbulence: .1
					});
				}
			}

			return true;
		}

		structure.model.children[0].material.opacity += .02;

		if(structure.health === this.targetHealth) {
			structure.model.children[0].material.opacity = 1;
			structure.model.children[0].material.transparent = false;
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
