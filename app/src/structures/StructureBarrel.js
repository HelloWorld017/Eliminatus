import Structure from "./Structure";
import BarrelModel from "../../models/objects/barrel.obj";
import BarrelMaterial from "../../models/objects/barrel.mtl";
import BarrelTexture from "../../models/objects/barrel.png";

class StructureBarrel extends Structure{
	constructor(world, x, y, z) {
		super(StructureBarrel.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureBarrel.type, BarrelModel, BarrelMaterial, BarrelTexture, {x: 20, y: 20});
	}
}

StructureBarrel.type = "barrel";

export default StructureBarrel;
