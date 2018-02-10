import {Geometry, MultiplyBlending, Points, PointsMaterial, Vector3} from "three";
import Particle from "./Particle";

class ParticleEmitter {
	constructor(color, size=5) {
		this.geometry = new Geometry;
		this.geometry.needsUpdate = true;

		this.material = new PointsMaterial({
			color,
			blending: MultiplyBlending,
			map: Particle.texture,
			size: size,
			transparent: true
		});
		this.particles = [];
		this.randomFactor = 3;

		this.particleSystem = new Points(this.geometry, this.material);
	}

	emit(position, count, init, update) {
		for(let i = 0; i < count; i++) {
			const particle = new Particle(position.clone().add(new Vector3(
				Math.random() * this.randomFactor - this.randomFactor / 2,
				Math.random() * this.randomFactor - this.randomFactor / 2,
				Math.random() * this.randomFactor - this.randomFactor / 2
			)));


			init(particle);
			particle.onUpdate = update;

			this.particles.push(
				particle
			);

			this.geometry.vertices.push(particle.position);
		}
	}

	update() {
		this.particles.forEach(v => v.update());
	}
}

export default ParticleEmitter;
