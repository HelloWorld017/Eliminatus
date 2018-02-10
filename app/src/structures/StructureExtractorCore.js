import Structure from "./Structure";
import {Vector2} from "three";

import ExtractorCoreModel from "../../models/structures/extractor_core.obj";
import ExtractorCoreMaterial from "../../models/structures/extractor_core.mtl";
import ExtractorCoreTexture from "../../models/structures/extractor_core.png";

class StructureExtractorCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureExtractorCore.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(
			StructureExtractorCore.type, ExtractorCoreModel,
			ExtractorCoreMaterial, ExtractorCoreTexture
		);
	}
}

StructureExtractorCore.type = "extractor_core";

export default StructureExtractorCore;
