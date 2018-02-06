import Structure from "./Structure";
import TurretModel from "../../models/structures/turret.obj";
import TurretMaterial from "../../models/structures/turret.mtl";
import TurretTexture from "../../models/structures/turret.png";

class StructureTurret extends Structure{
	constructor(world, x, y, z) {
		super(StructureTurret.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureTurret.type, TurretModel, TurretMaterial, TurretTexture, {x: 20, y: 20});
	}
}

StructureTurret.type = "turret";

export default StructureTurret;
