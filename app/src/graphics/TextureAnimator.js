import {RepeatWrapping} from "three";

class TextureAnimator {
	constructor(texture, options) {
		this.width = options.width;
		this.height = options.height;
		this.imageWidth = options.imageWidth;
		this.imageHeight = options.imageHeight;
		this.horizontalAmount = options.horizontalAmount;
		this.totalAmount = options.totalAmount;
		this.duration = options.duration;

		this.xSize = this.imageWidth / this.width;
		this.ySize = this.imageHeight / this.height;

		this.texture = texture;
		this.texture.wrapS = this.texture.wrapT = RepeatWrapping;
		this.texture.repeat.set(this.width / this.imageWidth, this.height / this.imageHeight);
		this.texture.offset.set(0, 0);

		this.currentTime = 0;
		this.currentTile = 0;
	}

	update(tick) {
		this.currentTime += tick;
		this.currentTile = Math.floor(this.currentTime / this.duration);

		if(this.currentTile > this.totalAmount) return;

		const column = this.currentTile % this.horizontalAmount;
		const row = Math.floor(this.currentTile / this.horizontalAmount);

		this.texture.offset.set(column / this.xSize, 1 - row / this.ySize);
	}
}

export default TextureAnimator;
