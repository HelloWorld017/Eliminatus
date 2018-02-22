import Structure from "./Structure";
import {Vector2} from "three";

import ExtractorCoreModel from "../../models/structures/extractor_core.obj";
import ExtractorCoreMaterial from "../../models/structures/extractor_core.mtl";
import ExtractorCoreTexture from "../../models/structures/extractor_core.png";

class StructureExtractorCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureExtractorCore.type, world, x, y, z);
	}

	static get ingredients() {
		return {
			cytrium: 70,
			stone: 10,
			wood: 10
		};
	}

	static async registerModel(loader) {
		return loader.load(
			StructureExtractorCore.type, ExtractorCoreModel,
			ExtractorCoreMaterial, ExtractorCoreTexture
		);
	}

	static canBuiltOn(world, x, y, z, rotation) {
		return this.getGridPositionByAttr(x, y, z, rotation).every((v) => {
			return world.structures[world.getPositionTag(v)] &&
				world.structures[world.getPositionTag(v)].type === 'ore';
		});
	}

	static getInavailReasons(world, x, y, z, rotation) {
		return ["Should be installed on top of ore!"];
	}
}

StructureExtractorCore.type = "extractor_core";

export default StructureExtractorCore;
