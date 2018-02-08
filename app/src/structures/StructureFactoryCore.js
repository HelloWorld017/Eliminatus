import Structure from "./Structure";
import FactoryCoreModel from "../../models/structures/factory_core.obj";
import FactoryCoreMaterial from "../../models/structures/factory_core.mtl";
import FactoryCoreTexture from "../../models/structures/factory_core.png";
import {Vector2} from "three";

class StructureFactoryCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureFactoryCore.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(
			StructureFactoryCore.type,
			FactoryCoreModel,
			FactoryCoreMaterial,
			FactoryCoreTexture
		);
	}

	static get positioningMethod() {
		return Math.round;
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

StructureFactoryCore.type = "factory_core";

export default StructureFactoryCore;
