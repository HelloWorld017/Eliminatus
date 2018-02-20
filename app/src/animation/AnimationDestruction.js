import Animation from "./Animation";
import Textures from "../graphics/Textures";
import TextureAnimator from "../graphics/TextureAnimator";

import {Clock, Sprite, SpriteMaterial, Vector3} from "three";

class AnimationDestruction extends Animation {
	constructor({targetHealth}) {
		super();
		this.clock = new Clock;
	}

	onAttach(structure) {
		this.spriteTexture = Textures.textures.explosion.clone();
		this.spriteTexture.needsUpdate = true;
		this.spriteAnimator = new TextureAnimator(this.spriteTexture, {
			imageWidth: 2048,
			imageHeight: 2048,
			width: 256,
			height: 256,
			horizontalAmount: 6,
			totalAmount: 53,
			duration: 20
		});
		this.explosionSprite = new Sprite(new SpriteMaterial({
			map: this.spriteTexture
		}));
		this.explosionSprite.position.copy(structure.model.position);
		this.explosionSprite.position.y = 45;
		this.explosionSprite.scale.set(90, 90, 1);
		structure.world.renderer.scene.add(this.explosionSprite);
		structure.world.renderer.scene.remove(structure.model);
	}

	onUpdate(structure) {
		this.spriteAnimator.update(1000 * this.clock.getDelta());

		return true;
	}

	onDestroy(structure, context) {
		structure.world.renderer.scene.remove(this.explosionSprite);
	}

	get length() {
		return 60;
	}

	static get animationId() {
		return "structure.destruct";
	}
}

export default AnimationDestruction;
