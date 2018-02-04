import Entity from "./Entity";
import PlayerModel from "../../models/entities/player.obj";
import PlayerMaterial from "../../models/entities/player.mtl";
import PlayerTexture from "../../models/entities/player.png";

const ENTITY_TYPE = "player.peer";

class EntityPeerPlayer extends Entity {
	constructor(world, x, y, z) {
		super(ENTITY_TYPE, world, x, y, z);
	}

	update(ctx) {

	}

	static async registerModel(loader) {
		return await loader.load(ENTITY_TYPE, PlayerModel, PlayerMaterial, PlayerTexture);
	}
}

EntityPeerPlayer.type = "player.peer";

export default EntityPeerPlayer;
