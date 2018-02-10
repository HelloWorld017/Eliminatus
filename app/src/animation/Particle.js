import {TextureLoader, Vector3} from "three";
import ParticleTexture from "../../images/particle.png";
import loadPromise from "../utils/LoadPromise";

class Particle {
	constructor(position) {
		this.position = position;
		this.motion = new Vector3(0, 0, 0);
		this.onUpdate = () => {};
	}

	update() {
		this.position.add(this.motion);
		this.onUpdate(this);
	}

	static async init() {
		this.texture = await loadPromise(new TextureLoader, ParticleTexture);
	}
}

export default Particle;
