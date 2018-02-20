import deepExtend from "deep-extend";
import HealthBarRasterized from "../graphics/HealthBarRasterized";
import ModelLoader from "../utils/ModelLoader";
import Textures from "../graphics/Textures";
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

		await Textures.init();
		await HealthBarRasterized.init();
		await this.renderer.init();
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

			this.getChunksByAABB(object.aabb).forEach(chunk => {
				if(!this.chunk[chunk]) this.chunk[chunk] = {};
				this.chunk[chunk][this.getPositionTag(v)] = object;
			});
		});
	}

	getChunksByAABB(aabb) {
		const chunks = [];

		for(
			let x = Math.floor(aabb.min.x / CHUNK_UNIT);
			x <= Math.floor(aabb.max.x / CHUNK_UNIT);
			x++
		) {
			for(
				let y = Math.floor(aabb.min.z / CHUNK_UNIT);
				y <= Math.floor(aabb.max.z / CHUNK_UNIT);
				y++
			) {
				chunks.push(`${x}:${y}`);
			}
		}

		return chunks;
	}

	removeStructure(object, removeModel=false) {
		if(removeModel)
			this.renderer.scene.remove(object.model);

		const positions = object.getGridPosition();
		const chunks = this.getChunksByAABB(object.aabb);

		positions.forEach((v) => {
			const tag = this.getPositionTag(v);
			chunks.forEach(chunk => {
				delete this.chunk[chunk][tag];
			});
			delete this.structures[tag];
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
