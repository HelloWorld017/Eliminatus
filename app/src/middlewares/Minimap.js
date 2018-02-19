import Rotation from "../math/Rotation";

class Minimap {
	constructor(game) {
		this.canvas = document.querySelector('#minimap');
		this.updateSize();
		this.ctx = this.canvas.getContext('2d');
		this.game = game;
		this.player = game.player;
		this.handler = this._handler.bind(this);

		window.addEventListener('resize', () => this.updateSize());
	}

	_handler() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

		this.ctx.strokeStyle = '#f0f0f0';
		this.ctx.lineWidth = 1;
		this.ctx.beginPath();
		this.ctx.moveTo(this.canvas.width / 2, 0);
		this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.moveTo(0, this.canvas.height / 2);
		this.ctx.lineTo(this.canvas.width, this.canvas.height / 2);
		this.ctx.stroke();

		this.drawPlayer();
	}

	drawPlayer() {
		const playerX = (1 - this.player.model.position.x / this.game.world.width) * this.canvas.width;
		const playerY = (1 - this.player.model.position.z / this.game.world.height) * this.canvas.height;

		let shape = [
			{x: playerX, y: playerY - this.canvas.height * .055},
			{x: playerX - this.canvas.width * .05, y: playerY + this.canvas.height * .055},
			{x: playerX, y: playerY + this.canvas.height * .035},
			{x: playerX + this.canvas.width * .05, y: playerY + this.canvas.height * .055}
		];

		shape = Rotation.rotateAll(shape, Math.PI * 2 - this.player.model.rotation.y, {
			x: playerX, y: playerY
		});

		this.ctx.fillStyle = '#2196f3';
		this.ctx.beginPath();
		this.ctx.moveTo(shape[0].x, shape[0].y);

		for(let i = 0; i < shape.length; i++) {
			const vertex = shape[(i + 1) % shape.length];
			this.ctx.lineTo(vertex.x, vertex.y);
		}

		this.ctx.fill();
	}

	updateSize() {
		this.canvas.width = window.innerWidth / 10;
		this.canvas.height = window.innerWidth / 10;
	}
}

export default Minimap;
