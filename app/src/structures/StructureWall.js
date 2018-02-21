import Structure from "./Structure";
import WallModel from "../../models/structures/wall.obj";
import WallMaterial from "../../models/structures/wall.mtl";
import WallTexture from "../../models/structures/wall.png";

class StructureWall extends Structure{
	constructor(world, x, y, z) {
		super(StructureWall.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureWall.type, WallModel, WallMaterial, WallTexture);
	}

	static get ingredients() {
		return {
			cytrium: 50,
			stone: 40
		};
	}
}

StructureWall.type = "wall";

export default StructureWall;
