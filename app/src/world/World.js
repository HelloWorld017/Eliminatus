import deepExtend from "deep-extend";
import ModelLoader from "../utils/ModelLoader";
import Renderer from "../graphics/Renderer";

import loadEntity from "../entity";
import loadStructures from "../structures";

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

		this.modelLoader = new ModelLoader();
		this.renderer = new Renderer(this);
	}

	async init() {
		this.entitiesByType = await loadEntity(this.modelLoader);
		this.structureByType = await loadStructures(this.modelLoader);
		this.generateWorld();
	}

	generateWorld() {
		//TODO Move this to server side
		const headquater = new (this.structureByType['headquater'])(this, this.width / 2, 0, this.height / 2);
		this.addStructure(headquater);

		Object.keys(this.settings.generate).forEach((key) => {
			const structure = this.structureByType[key];
			for(let i = 0; i < this.settings.generate[key]; i++) {
				let placeable = null;
				while(!placeable) {
					const x = Math.floor(Math.random() * (this.settings.width / 40));
					const y = Math.floor(Math.random() * (this.settings.height / 40));

					for(let testX = x; testX < x + structure.width; testX++) {
						for(let testY = y; testY < y + structure.height; testY++) {
							if(this.structures[this.getPositionTag({x: testX, y: testY})]) {
								placeable = false;
								break;
							}
						}
					}

					if(placeable === null) {
						placeable = true;
						this.addStructure(new structure(this, x * 40, 0, y * 40));
					}else placeable = null;
				}
			}
		});
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
			const {x, y} = v;
			this.structures[this.getPositionTag({x, y})] = object;
		});
	}

	removeStructure(object) {
		this.renderer.scene.remove(object.model);

		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			delete this.structures[this.getPositionTag({x, y})];
		});
	}

	tick(ctx) {
		this.entities.forEach((v, k) => v.update(ctx));
		this.deathNote.forEach((v) => this.entities.remove(v));
		this.deathNote = [];
	}
}

export default World;
