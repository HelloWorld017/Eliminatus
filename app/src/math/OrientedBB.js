import {Vector2} from "three";
import Rotation from "./Rotation";

class OrientedBB {
	constructor() {
		this.vertices = [];
		this.position = new Vector2;
		this.rotation = Math.PI / 2;
	}

	setFromAABB(aabb) {
		this.vertices = [
			new Vector2(aabb.min.x, aabb.min.z),
			new Vector2(aabb.min.x, aabb.max.z),
			new Vector2(aabb.max.x, aabb.min.z),
			new Vector2(aabb.max.x, aabb.max.z)
		];

		return this;
	}

	updateFromModel(model) {
		this.rotation = model.rotation.y;
		this.position = this.position.set(model.position.x, model.position.z);

		return this;
	}

	getVertices() {
		return Rotation.rotateAll(
			this.vertices.map(v => v.clone().add(this.position)),
			this.rotation, this.position
		);
	}
}

export default OrientedBB;
