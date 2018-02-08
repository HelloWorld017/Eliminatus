import Structure from "./Structure";
import {Vector2} from "three";

import GeneratorCoreModel from "../../models/structures/generator_core.obj";
import GeneratorCoreMaterial from "../../models/structures/generator_core.mtl";
import GeneratorCoreTexture from "../../models/structures/generator_core.png";

class StructureGeneratorCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureGeneratorCore.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(
			StructureGeneratorCore.type,
			GeneratorCoreModel,
			GeneratorCoreMaterial,
			GeneratorCoreTexture
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

StructureGeneratorCore.type = "generator_core";

export default StructureGeneratorCore;
