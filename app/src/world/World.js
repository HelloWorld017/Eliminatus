import deepExtend from "deep-extend";
import HealthBarRasterized from "../graphics/HealthBarRasterized";
import ModelLoader from "../utils/ModelLoader";
import ParticleTextures from "../animation/ParticleTextures";
import Renderer from "../graphics/Renderer";

import animations from "../animation";
import loadEntity from "../entity";
import loadStructures from "../structures";

const CHUNK_UNIT = 200;
const DEFAULT_SETTINGS = {
	width: 8000,
	height: 8000,
	generate: {
		ore: 50,
		tree: 400,
		rock: 50,
		stone: 75,
		lamp: 200,
		barrel: 30
	}
};

class World {
	constructor(game, settings = {}) {
		this.settings = deepExtend({}, DEFAULT_SETTINGS, settings);
		this.game = game;
		this.width = this.settings.width;
		this.height = this.settings.height;

		this.deathNote = [];
		this.entities = new Map();
		this.structures = {};
		this.chunk = {};
		this.structureAnimations = [];

		this.modelLoader = new ModelLoader();
		this.renderer = new Renderer(this);
	}

	async init() {
		this.entitiesByType = await loadEntity(this.modelLoader);
		this.structureByType = await loadStructures(this.modelLoader);
		this.animationsByType = animations;

		await this.renderer.init();
		await ParticleTextures.init();
		await HealthBarRasterized.init();
	}

	spawnEntity(eid, entity) {
		this.entities.set(eid, entity);
		this.renderer.scene.add(entity.model);
	}

	despawnEntity(eid) {
		this.deathNote.push(eid);
	}

	getPositionTag(vector2) {
		return `${vector2.x}:${vector2.y}`;
	}

	addStructure(object) {
		this.renderer.scene.add(object.model);

		const positions = object.getGridPosition();
		positions.forEach((v) => {
			this.structures[this.getPositionTag(v)] = object;

			if(!this.chunk[this.getChunk(v)]) this.chunk[this.getChunk(v)] = {};
			this.chunk[this.getChunk(v)][this.getPositionTag(v)] = object;
		});
	}

	getChunk({x, y}) {
		return this.getPositionTag({
			x: Math.floor(x * 40 / CHUNK_UNIT),
			y: Math.floor(y * 40 / CHUNK_UNIT)
		});
	}

	removeStructure(object) {
		this.renderer.scene.remove(object.model);

		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			delete this.structures[this.getPositionTag(v)];
			delete this.chunk[this.getChunk(v)][this.getPositionTag(v)];
		});
	}

	tick(ctx) {
		this.entities.forEach((v, k) => v.update(ctx));
		this.deathNote.forEach((v) => this.entities.delete(v));
		this.deathNote = [];

		this.structureAnimations = this.structureAnimations.filter(v => v[1].update(v[0], ctx));
	}
}

export default World;
