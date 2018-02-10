import Structure from "./Structure";
import {Vector2} from "three";

import TransmitterCoreModel from "../../models/structures/transmitter_core.obj";
import TransmitterCoreMaterial from "../../models/structures/transmitter_core.mtl";
import TransmitterCoreTexture from "../../models/structures/transmitter_core.png";

class StructureTransmitterCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureTransmitterCore.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(
			StructureTransmitterCore.type, TransmitterCoreModel,
			TransmitterCoreMaterial, TransmitterCoreTexture
		);
	}

	static getBoundMap(rot) {
		if(rot === Math.PI * 3 / 2) return {x: 23, y: 0, z: 20};
		if(rot === Math.PI) return {x: 20, y: 0, z: 23};
		if(rot === Math.PI / 2) return {x: 17, y: 0, z: 20};
		return {x: 20, y: 0, z: 17};
	}
}

StructureTransmitterCore.type = "transmitter_core";

export default StructureTransmitterCore;
