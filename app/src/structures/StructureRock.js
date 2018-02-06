import Structure from "./Structure";
import RockModel from "../../models/objects/rock.obj";
import RockMaterial from "../../models/objects/rock.mtl";
import RockTexture from "../../models/objects/rock.png";

class StructureRock extends Structure{
	constructor(world, x, y, z) {
		super(StructureRock.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureRock.type, RockModel, RockMaterial, RockTexture, {x: 20, y: 20});
	}
}

StructureRock.type = "rock";

export default StructureRock;
