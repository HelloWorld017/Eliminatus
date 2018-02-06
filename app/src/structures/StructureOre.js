import Structure from "./Structure";
import OreModel from "../../models/objects/ore.obj";
import OreMaterial from "../../models/objects/ore.mtl";
import OreTexture from "../../models/objects/ore.png";

class StructureOre extends Structure{
	constructor(world, x, y, z) {
		super(StructureOre.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureOre.type, OreModel, OreMaterial, OreTexture, {x: 20, y: 20});
	}
}

StructureOre.type = "ore";

export default StructureOre;
