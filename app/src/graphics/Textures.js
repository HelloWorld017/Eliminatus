import ExplosionTexture from "../../images/texture/explosion.png";
import ParticleTexture from "../../images/texture/particle.png";
import PerlinTexture from "../../images/texture/perlin.png";
import TerrainTexture from "../../images/texture/terrain.png";
import {TextureLoader} from "three";

import loadPromise from "../utils/LoadPromise";

export default class Textures {
	static async init() {
		this.textures = {
			explosion: await loadPromise(new TextureLoader, ExplosionTexture),
			particle: await loadPromise(new TextureLoader, ParticleTexture),
			perlin: await loadPromise(new TextureLoader, PerlinTexture),
			terrain: await loadPromise(new TextureLoader, TerrainTexture)
		}
	};
};
