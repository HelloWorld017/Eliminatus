import Entity from "./Entity";
import PlayerModel from "../../models/entities/player.obj";
import PlayerMaterial from "../../models/entities/player.mtl";
import PlayerTexture from "../../models/entities/player.png";
import {Sprite, SpriteMaterial, Texture} from "three";

const ENTITY_TYPE = "player.peer";

class EntityPeerPlayer extends Entity {
	constructor(world, x, y, z) {
		super(ENTITY_TYPE, world, x, y, z);
		this.nameTagCanvas = document.createElement('canvas');
		this.nameTagCtx = this.nameTagCanvas.getContext('2d');
		this.nameTagImage = new Image;
		this.nameTagSprite = undefined;
		this.name = '';
	}

	createNameTag() {

		this.nameTagCanvas.width = 256;
		this.nameTagCanvas.height = 64;

		this.nameTagCtx.fillStyle = 'rgba(0, 0, 0, .3)';
		this.nameTagCtx.fillRect(0, 0, this.nameTagCanvas.width, this.nameTagCanvas.height);
		this.nameTagCtx.fillStyle = '#f1f2f3';
		this.nameTagCtx.font = '30px Saira';
		this.nameTagCtx.textBaseline = 'middle';
		this.nameTagCtx.textAlign = 'center';
		this.nameTagCtx.fillText(this.name, 128, 32);

		const texture = new Texture(this.nameTagCanvas);
		texture.needsUpdate = true;

		const spriteMaterial = new SpriteMaterial({
			map: texture
		});

		this.nameTagSprite = new Sprite(spriteMaterial);
		this.nameTagSprite.scale.set(64, 16, 1);
		this.nameTagSprite.position.y = 40;
		this.model.add(this.nameTagSprite);
	}

	importFromTag(tag) {
		if(tag.name) {
			this.name = tag.name;
			this.createNameTag();
		}
	}

	update(ctx) {

	}

	static async registerModel(loader) {
		return await loader.load(ENTITY_TYPE, PlayerModel, PlayerMaterial, PlayerTexture);
	}
}

EntityPeerPlayer.type = "player.peer";

export default EntityPeerPlayer;
