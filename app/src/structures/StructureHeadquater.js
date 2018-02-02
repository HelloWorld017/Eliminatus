import Structure from "./Structure";
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
}

StructureHeadquater.type = "headquater";

export default StructureHeadquater;
