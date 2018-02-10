import ParticleTexture from "../../images/particle.png";
import PerlinTexture from "../../images/perlin.png";
import {TextureLoader} from "three";

import loadPromise from "../utils/LoadPromise";

export default class ParticleTextures {

	static async init() {
		this.particle = {
			perlin: await loadPromise(new TextureLoader, PerlinTexture),
			particle: await loadPromise(new TextureLoader, ParticleTexture)
		}
	};
};
