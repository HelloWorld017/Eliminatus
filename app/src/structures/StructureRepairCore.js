import Structure from "./Structure";
import {Vector2} from "three";

import RepairCoreModel from "../../models/structures/repair_core.obj";
import RepairCoreMaterial from "../../models/structures/repair_core.mtl";
import RepairCoreTexture from "../../models/structures/repair_core.png";

class StructureRepairCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureRepairCore.type, world, x, y, z);
	}

	get hpBarPosition() {
		return {
			x: 0,
			y: 100,
			z: 0
		};
	}

	static async registerModel(loader) {
		return loader.load(
			StructureRepairCore.type,
			RepairCoreModel,
			RepairCoreMaterial,
			RepairCoreTexture
		);
	}

	static get ingredients() {
		return {
			cytrium: 400,
			stone: 75,
			wood: 30
		};
	}

	static get positioningMethod() {
		return Math.round;
	}

	static getBoundMap(rot) {
		return {x: 0, y: 0, z: 0};
	}

	static get width() {
		return 2;
	}

	static get height() {
		return 2;
	}

	static getGridPositionByAttr(x, y, z, rotation) {
		x = Math.floor(x / 40);
		z = Math.floor(z / 40);

		return [
			new Vector2(x, z),
			new Vector2(x + 1, z),
			new Vector2(x, z + 1),
			new Vector2(x + 1, z + 1)
		];
	}
}

StructureRepairCore.type = "repair_core";

export default StructureRepairCore;
