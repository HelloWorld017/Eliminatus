import Structure from "./Structure";
import RotatedWallModel from "../../models/structures/wall_rot.obj";
import RotatedWallMaterial from "../../models/structures/wall_rot.mtl";
import RotatedWallTexture from "../../models/structures/wall_rot.png";

class StructureRotatedWall extends Structure{
	constructor(world, x, y, z) {
		super(StructureRotatedWall.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(
			StructureRotatedWall.type,
			RotatedWallModel,
			RotatedWallMaterial,
			RotatedWallTexture
		);
	}

	static get ingredients() {
		return {
			cytrium: 50,
			stone: 40
		};
	}
}

StructureRotatedWall.type = "wall_rot";

export default StructureRotatedWall;
