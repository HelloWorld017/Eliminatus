import Structure from "./Structure";
import StoneModel from "../../models/objects/stone.obj";
import StoneMaterial from "../../models/objects/stone.mtl";
import StoneTexture from "../../models/objects/stone.png";

class StructureStone extends Structure{
	constructor(world, x, y, z) {
		super(StructureStone.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureStone.type, StoneModel, StoneMaterial, StoneTexture, {x: 20, y: 20});
	}
}

StructureStone.type = "stone";

export default StructureStone;
