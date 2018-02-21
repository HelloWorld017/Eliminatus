import Structure from "./Structure";
import {Vector2} from "three";

import EngineeringCoreModel from "../../models/structures/engineering_core.obj";
import EngineeringCoreMaterial from "../../models/structures/engineering_core.mtl";
import EngineeringCoreTexture from "../../models/structures/engineering_core.png";

class StructureEngineeringCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureEngineeringCore.type, world, x, y, z);
	}

	get hpBarPosition() {
		return {
			x: 0,
			y: 100,
			z: 0
		};
	}

	static async registerModel(loader) {
		return loader.load(
			StructureEngineeringCore.type, EngineeringCoreModel,
			EngineeringCoreMaterial, EngineeringCoreTexture
		);
	}

	static get positioningMethod() {
		return Math.round;
	}

	static get ingredients() {
		return {
			cytrium: 700,
			stone: 50,
			wood: 30
		};
	}

	static getBoundMap(rot) {
		return {x: 0, y: 0, z: 0};
	}

	static get width() {
		return 2;
	}

	static get height() {
		return 2;
	}

	static getGridPositionByAttr(x, y, z, rotation) {
		x = Math.floor(x / 40);
		z = Math.floor(z / 40);

		return [
			new Vector2(x, z),
			new Vector2(x + 1, z),
			new Vector2(x, z + 1),
			new Vector2(x + 1, z + 1)
		];
	}
}

StructureEngineeringCore.type = "engineering_core";

export default StructureEngineeringCore;
