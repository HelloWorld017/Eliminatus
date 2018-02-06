import Structure from "./Structure";
import {Vector2} from "three";

import HqModel from "../../models/structures/headquater.obj";
import HqMaterial from "../../models/structures/headquater.mtl";
import HqTexture from "../../models/structures/headquater.png";

class StructureHeadquater extends Structure{
	constructor(world, x, y, z) {
		super(StructureHeadquater.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureHeadquater.type, HqModel, HqMaterial, HqTexture);
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

StructureHeadquater.type = "headquater";

export default StructureHeadquater;
