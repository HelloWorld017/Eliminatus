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
	}

	getGridPosition() {
		return [new Vector2(
			Math.floor(this.model.position.x / 40), Math.floor(this.model.position.y / 40)
		)];
	}

	activateMenu() {

	}

	static async registerModel() {

	}

	static async canBuiltOn() {

	}

	static get width() {
		return 1;
	}

	static get height() {
		return 1;
	}
}

export default Structure;
