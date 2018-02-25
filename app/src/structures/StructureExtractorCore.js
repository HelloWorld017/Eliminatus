import Structure from "./Structure";
import {Sprite, SpriteMaterial, Vector2} from "three";
import Textures from "../graphics/Textures";

import ExtractorCoreModel from "../../models/structures/extractor_core.obj";
import ExtractorCoreMaterial from "../../models/structures/extractor_core.mtl";
import ExtractorCoreTexture from "../../models/structures/extractor_core.png";

class StructureExtractorCore extends Structure{
	constructor(world, x, y, z) {
		super(StructureExtractorCore.type, world, x, y, z);
		this.antennaSprite = new Sprite(new SpriteMaterial({
			map: Textures.textures.no_antenna
		}));
		this.antennaSprite.scale.set(30, 30, 1);
		this.antennaSprite.position.set(0, 30, 0);

		this.connected = false;
		this.updateConnectionState();
	}

	importFromTag(tags) {
		if(tags.connected) {
			this.connected = tags.connected;
			this.updateConnectionState();
		}
	}

	updateConnectionState() {
		if(!this.connected) {
			this.model.add(this.antennaSprite);
		} else {
			this.model.remove(this.antennaSprite);
		}
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
		return ["Not on cytrium ore!"];
	}
}

StructureExtractorCore.type = "extractor_core";

export default StructureExtractorCore;
