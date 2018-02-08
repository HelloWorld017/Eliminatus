import Structure from "./Structure";
import LampModel from "../../models/objects/lamp.obj";
import LampMaterial from "../../models/objects/lamp.mtl";
import LampTexture from "../../models/objects/lamp.png";

class StructureLamp extends Structure{
	constructor(world, x, y, z) {
		super(StructureLamp.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureLamp.type, LampModel, LampMaterial, LampTexture);
	}
}

StructureLamp.type = "lamp";

export default StructureLamp;
