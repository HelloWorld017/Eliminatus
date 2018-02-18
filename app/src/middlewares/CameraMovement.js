import {GridHelper} from "three";
import Tween from "../animation/Tween";

class CameraMovement {
	constructor() {
		this.gridStatus = false;
		this.rotation = 90;
		this.rotationTween = new Tween(this.rotation);

		this.handler = this._handler.bind(this);
	}

	init(world) {
		this.camera = world.renderer.camera;
		this.entity = world.renderer.playerModel;
		this.game = world.game;
		this.world = world;

		const gridSize = Math.max(this.world.width, this.world.height);
		const gridCount = Math.ceil(gridSize / 40);

		this.buildGrid = new GridHelper(gridSize, gridCount);
		this.buildGrid.position.x = this.world.width / 2;
		this.buildGrid.position.y = 0.2;
		this.buildGrid.position.z = this.world.height / 2;

		this._followCamera = false;
	}

	resetCamera() {
		this.camera.position.x = this.originalPos.x - this.cos * this.cameraDistance;
		this.camera.position.z = this.originalPos.z - this.sin * this.cameraDistance;

		this.camera.lookAt(this.originalPos.x, 0, this.originalPos.z);
	}

	updateGridStatus() {
		if(this.camera.position.y < 200 && !this.gridStatus) {
			this.world.renderer.scene.add(this.buildGrid);
			this.gridStatus = true;
		} else if (this.camera.position.y >= 200 && this.gridStatus) {
			this.world.renderer.scene.remove(this.buildGrid);
			this.gridStatus = false;
		}
	}

	lookPlayer() {
		this.x = this.entity.position.x - this.cos * this.cameraDistance,
		this.z = this.entity.position.z - this.sin * this.cameraDistance
	}

	toggleFollowCamera() {
		if(this.followCamera) {
			this.followCamera = false;
		} else {
			this.followCamera = true;
			this.lookPlayer();
		}
	}

	_handler({world}, ctx) {
		if(!this.world) this.init(world);

		if(ctx.mouse.x < 30) {
			this.x += 4.1 * this.sin;
			this.z -= 4.1 * this.cos;
		} else if(ctx.mouse.x > window.innerWidth - 30) {
			this.x -= 4.1 * this.sin;
			this.z += 4.1 * this.cos;
		}

		if(ctx.mouse.y < 30) {
			this.x += 4.1 * this.cos;
			this.z += 4.1 * this.sin;
		} else if(ctx.mouse.y > window.innerHeight - 30) {
			this.x -= 4.1 * this.cos;
			this.z -= 4.1 * this.sin;
		}

		ctx.mouse.events.forEach((v) => {
			if(v.type !== 'mouse:wheel') return;
			if(v.deltaY > 0) {
				this.y += 8;
			} else {
				this.y -= 8;
			}

			this.updateGridStatus();
		});

		ctx.keyboard.events.forEach((v) => {
			if(v.type !== 'keyboard:keydown') return;

			switch(v.key) {
				case 'q': this.rotationTween.setTargetValue(this.rotationTween.target + 45); break;
				case 'e': this.rotationTween.setTargetValue(this.rotationTween.target - 45); break;
				case 'tab': this.toggleFollowCamera(); break;
			}
		});

		this.rotationTween.update();

		if(this.rotationTween.value !== this.rotation) {
			const original = this.originalPos;

			this.rotation = this.rotationTween.value;

			this.camera.position.x = original.x - this.cos * this.cameraDistance;
			this.camera.position.z = original.z - this.sin * this.cameraDistance;

			this.camera.lookAt(original.x, 0, original.z);
		}

		if(this.followCamera) this.lookPlayer();
	}

	get cameraDistance() {
		return this.y / 2;
	}

	get originalPos() {
		return {
			x: this.camera.position.x + this.cos * this.cameraDistance,
			z: this.camera.position.z + this.sin * this.cameraDistance
		};
	}

	get followCamera() {
		return this._followCamera;
	}

	get rad() {
		return this.rotation / 180 * Math.PI;
	}

	get cos() {
		return Math.cos(this.rad);
	}

	get sin() {
		return Math.sin(this.rad);
	}

	get x() {
		return this.camera.position.x;
	}

	get y() {
		return this.camera.position.y;
	}

	get z() {
		return this.camera.position.z;
	}

	set followCamera(val) {
		this._followCamera = val;
		this.game.store.state.followCamera = val;
	}

	set x(x) {
		this.camera.position.x = Math.max(-50, Math.min(x, this.world.width + 50));
	}

	set y(y) {
		this.camera.position.y = Math.max(150, Math.min(y, 500));
	}

	set z(z) {
		this.camera.position.z = Math.max(-50, Math.min(z, this.world.height + 50));
	}
}

export default CameraMovement;
