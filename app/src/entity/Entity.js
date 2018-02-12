import {Box3} from "three";

const CHUNK_UNIT = 200;

class Entity {
	constructor(entityName, world, x, y, z) {
		this.type = entityName;
		this.world = world;
		this.game = world.game;

		this.model = world.modelLoader.get(entityName);
		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

		this.health = 50;
		this.animation = [];

		this.aabb = new Box3();
	}

	render() {

	}

	attachAnimation(animation) {
		this.animation.push(animation);
		animation.onAttach(this);
	}

	update(ctx) {
		this.animation = this.animation.filter(v => {
			return v.update(this, ctx);
		});
	}

	checkCollisionInChunk() {
		let collidesStructure = [];

		let checkedKey = {};
		this.getChunks().forEach(chunkKey => {
			if(this.world.chunk[chunkKey]) {
				const foundObject = Object.keys(this.world.chunk[chunkKey]).filter(structureKey => {
					if(checkedKey[this.world.structures[structureKey].uniqueId]) return;

					if(this.world.chunk[chunkKey][structureKey].aabb.intersectsBox(this.aabb)) {
						checkedKey[this.world.structures[structureKey].uniqueId] = true;
						return true;
					}

					return false;
				});

				if(foundObject.length > 0)
					collidesStructure.push(...foundObject.map(v => this.world.structures[v]));
			}
		});

		return collidesStructure;
	}

	getChunks() {
		const aabb = this.aabb.setFromObject(this.model);
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

	static async registerModel() {

	}

	importFromTag(tags) {

	}
}

export default Entity;
