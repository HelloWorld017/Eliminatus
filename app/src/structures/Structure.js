import {Vector2} from "three";

class Structure {
	constructor(structName, world, x, y, z) {
		this.type = structName;
		this.world = world;
		this.game = world.game;

		this.model = world.modelLoader.get(structName);
		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

		this.health = 300;
	}

	getGridPosition() {
		return this.constructor.getGridPositionByAttr(
			this.model.position.x, 0, this.model.position.z, this.model.rotation.y
		);
	}

	activateMenu() {

	}

	static async registerModel() {

	}

	static getGridPositionByAttr(x, y, z, rotation) {
		return [new Vector2(Math.floor(x / 40), Math.floor(z / 40))];
	}

	static canBuiltOn(world, x, y, z, rotation) {
		return this.getGridPositionByAttr(x, y, z, rotation).every((v) => {
			return !world.structures[world.getPositionTag(v)];
		});
	}

	static get width() {
		return 1;
	}

	static get height() {
		return 1;
	}
}

export default Structure;
