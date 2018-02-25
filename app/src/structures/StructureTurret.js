import Structure from "./Structure";
import TurretModel from "../../models/structures/turret.obj";
import TurretMaterial from "../../models/structures/turret.mtl";
import TurretTexture from "../../models/structures/turret.png";
import {Vector2} from "three";

class StructureTurret extends Structure{
	constructor(world, x, y, z) {
		super(StructureTurret.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureTurret.type, TurretModel, TurretMaterial, TurretTexture);
	}

	static getGridPositionByAttr(x, y, z, rot) {
		x = Math.floor(x / 40);
		z = Math.floor(z / 40);
		const grid = [new Vector2(x, z)];

		if(rot === Math.PI * 3 / 2) grid.push(new Vector2(x - 1, z));
		else if(rot === Math.PI) grid.push(new Vector2(x, z - 1));
		else if(rot === Math.PI / 2) grid.push(new Vector2(x + 1, z));
		else grid.push(new Vector2(x, z + 1));

		return grid;
	}

	static getBoundMap(rot) {
		if(rot === Math.PI * 3 / 2) return {x: 40, y: 0, z: 20};
		if(rot === Math.PI) return {x: 20, y: 0, z: 40};
		if(rot === Math.PI / 2) return {x: 0, y: 0, z: 20};
		return {x: 20, y: 0, z: 0};
	}

	static get ingredients() {
		return {
			cytrium: 400,
			stone: 20
		};
	}
}

StructureTurret.type = "turret";

export default StructureTurret;
