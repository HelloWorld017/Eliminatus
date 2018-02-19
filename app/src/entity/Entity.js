import {Box3} from "three";
import Collider from "../math/Collider";
import OrientedBB from "../math/OrientedBB";

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
		this.obb = (new OrientedBB())
			.setFromAABB((new Box3()).setFromObject(world.modelLoader.get(entityName)));
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
		this.obb.updateFromModel(this.model);
		const vertices = this.obb.getVertices();

		return this.getMergedChunkStructures().filter(structure => Collider.testCollision(
			[
				{x: structure.aabb.min.x, y: structure.aabb.min.z},
				{x: structure.aabb.min.x, y: structure.aabb.max.z},
				{x: structure.aabb.max.x, y: structure.aabb.min.z},
				{x: structure.aabb.max.x, y: structure.aabb.max.z}
			],

			vertices
		));
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

	getMergedChunkStructures() {
		const structures = [];
		const checkedKey = {};

		this.getChunks().forEach(chunkKey => {
			if(this.world.chunk[chunkKey]) {
				Object.keys(this.world.chunk[chunkKey]).forEach(structureKey => {
					if(checkedKey[this.world.structures[structureKey].uniqueId]) return;

					checkedKey[this.world.structures[structureKey].uniqueId] = true;
					structures.push(this.world.structures[structureKey]);
				});
			}
		});

		return structures;
	}

	static async registerModel() {

	}

	importFromTag(tags) {

	}
}

export default Entity;
