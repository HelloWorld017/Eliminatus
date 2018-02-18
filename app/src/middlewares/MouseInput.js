import CursorImage from "../../images/ui/cursor.png";

class MouseInput {
	constructor() {
		this.x = window.innerWidth / 2;
		this.y = window.innerHeight / 2;

		this.previousMovement = {x: 0, y: 0};

		this.initialized = false;
		this.locked = false;
		this.eventQueue = [];

		window.addEventListener('mousemove', ({clientX, clientY, movementX, movementY}) => {
			if(!this.initialized || !this.locked) {
				this.x = clientX;
				this.y = clientY;
				this.initialized = true;
			} else {
				if(this.previousMovement.x !== Math.sign(movementX) && this.previousMovement.x !== 0) {
					movementX = 0;
				}

				if(this.previousMovement.y !== Math.sign(movementY) && this.previousMovement.y !== 0) {
					movementY = 0;
				}

				this.previousMovement.x = Math.sign(movementX);
				this.previousMovement.y = Math.sign(movementY);

				this.x += movementX;
				this.y += movementY;

				this.x = Math.min(window.innerWidth, Math.max(0, this.x));
				this.y = Math.min(window.innerHeight, Math.max(0, this.y));
			}
		}, false);

		window.addEventListener('wheel', ({deltaX, deltaY}) => {
			this.eventQueue.push({
				type: 'mouse:wheel',
				deltaX, deltaY
			});
		}, false);

		window.addEventListener('contextmenu', () => {
			this.eventQueue.push({
				type: 'mouse:rightclick',
				x: this.x,
				y: this.y
			});
		}, false);

		window.addEventListener('click', () => {
			this.eventQueue.push({
				type: 'mouse:click',
				x: this.x,
				y: this.y
			});
		}, false);

		this.rendererCanvas = document.querySelector('#hud');
		this.ctx = this.rendererCanvas.getContext('2d');

		window.addEventListener('resize', () => this.updateSize(), false);
		this.updateSize();

		this.handler = this._handler.bind(this);

		document.addEventListener('pointerlockchange', () => this.lockHandler(), false);
		document.addEventListener('mozpointerlockchange', () => this.lockHandler(), false);

		this.cursorLoaded = false;
		this.cursorImage = new Image();
		this.cursorImage.onload = () => {
			this.cursorLoaded = true;
		};
		this.cursorImage.src = CursorImage;
	}

	_handler(game, ctx) {
		if(this.cursorLoaded) {
			this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
			this.ctx.drawImage(this.cursorImage, this.x, this.y);
			/*
			this.ctx.fillStyle = '#fff';
			this.ctx.fillText(`x: ${this.x}, y: ${this.y}`, this.x, this.y);
			*/
		}

		ctx.mouse = {
			x: this.x,
			y: this.y,
			events: this.eventQueue
		};

		this.eventQueue = [];
	}

	lockHandler() {
		const lockObject = document.querySelector('#game');
		if (document.pointerLockElement === lockObject || document.mozPointerLockElement === lockObject) {
			this.locked = true;
		} else {
			this.locked = false;
		}
	}

	updateSize() {
		this.rendererCanvas.width = window.innerWidth;
		this.rendererCanvas.height = window.innerHeight;
	}
}

export default MouseInput;
