import Entity from "./Entity";
import PlayerModel from "../../models/entities/player.obj";
import PlayerMaterial from "../../models/entities/player.mtl";
import PlayerTexture from "../../models/entities/player.png";
import {Raycaster, Vector2, Vector3} from "three";
import TempModel from "../utils/TempModel";

const ENTITY_TYPE = "player";

class EntityPlayer extends Entity {
	constructor(world, x, y, z) {
		super(ENTITY_TYPE, world, x, y, z);

		this.buildMode = false;
		this.buildKeymap = new Map([
			['1', 'headquater'],
			['2', 'factory_core'],
			['3', 'generator_core'],
			['4', 'repair_core'],
			['5', 'turret'],
			['6', 'wall'],
			['7', 'wall_rot']
		]);

		this.keyMap = new Map([
			['tab', () => this.toggleFollowCamera()],
			['`', () => this.cancelBuilding()]
		]);

		this._followCamera = false;
		this.raycaster = new Raycaster;
		this.mouse = new Vector2;
		this.buildPoint = new Vector3;
		this.tempModel = undefined;
		this.tempModelLoader = new TempModel(this.world.modelLoader);
	}

	get followCamera() {
		return this._followCamera;
	}

	set followCamera(val) {
		this._followCamera = val;
		this.game.store.state.followCamera = val;
	}

	lookPlayer() {
		this.world.renderer.camera.position.x = this.model.position.x;
		this.world.renderer.camera.position.z = this.model.position.z - this.world.renderer.camera.position.y / 2;
	}

	toggleFollowCamera() {
		if(this.followCamera) {
			this.followCamera = false;
		} else {
			this.followCamera = true;
			this.lookPlayer();
		}
	}

	cancelBuilding() {
		if(!this.buildMode) return;

		this.buildMode = false;
		this.world.renderer.scene.remove(this.tempModel);
	}

	confirmBuilding() {
		if(!this.buildMode) return;
		const structure = this.world.structureByType[this.buildMode];

		const buildTarget = new structure(this.world, this.buildPoint.x, 0, this.buildPoint.z);
		this.world.addStructure(buildTarget);
		this.cancelBuilding();
	}

	update(ctx) {
		if(ctx.keyboard.pressingKeys.get('a')) {
			this.model.rotation.y += Math.PI / 60;
		} else if(ctx.keyboard.pressingKeys.get('d')) {
			this.model.rotation.y -= Math.PI / 60;
		}

		let speedModifier = 0;

		if(ctx.keyboard.pressingKeys.get('w')) {
			speedModifier = 4;
		} else if(ctx.keyboard.pressingKeys.get('s')) {
			speedModifier = -4;
		}

		ctx.keyboard.events.forEach(({type, key}) => {
			if(type !== 'keyboard:keydown') return;

			if(this.keyMap.get(key) !== undefined) {
				this.keyMap.get(key)();
			}

			if(this.buildKeymap.get(key) !== undefined) {
				if(this.buildMode) this.cancelBuilding();
				this.buildMode = this.buildKeymap.get(key);
				this.tempModel = this.tempModelLoader.get(this.buildMode);
				this.world.renderer.scene.add(this.tempModel);

				this.buildPoint = this.model.position.clone();
			}
		});

		ctx.mouse.events.forEach(({type}) => {
			if(type === 'mouse:click') {
				if(this.buildMode) {
					this.confirmBuilding();
				}
			}
		});

		if(speedModifier) {
			const cos = Math.cos(this.model.rotation.y);
			const sin = Math.sin(this.model.rotation.y);

			this.model.position.x += sin * speedModifier;
			this.model.position.z += cos * speedModifier;
		}

		if(this.buildMode) {
			this.mouse.x = ctx.mouse.x / window.innerWidth * 2 - 1;
			this.mouse.y = ctx.mouse.y / window.innerHeight * -2 + 1;

			this.raycaster.setFromCamera(this.mouse, this.world.renderer.camera);

			const intersects = this.raycaster.intersectObjects(this.world.renderer.terrain.children, true);

			if(intersects.length > 0) {
				const point = intersects.pop().point;
				const myModel = this.model.position;
				if(Math.hypot(point.x - myModel.x, point.z - myModel.z) > 100) {
					const theta = Math.atan2(point.z - myModel.z, point. x - myModel.x);
					point.x = myModel.x + Math.cos(theta) * 100;
					point.z = myModel.z + Math.sin(theta) * 100;
				}

				point.x = Math.round(point.x / 40) * 40;
				point.z = Math.round(point.z / 40) * 40;
				this.buildPoint = point;
				this.tempModel.position.copy(point);
			}
		}

		if(this.followCamera) this.lookPlayer();

		this.game.announce('game.player.move', {
			x: this.model.position.x,
			y: this.model.position.y,
			z: this.model.position.z,
			rotation: this.model.rotation.y
		});
	}

	static async registerModel(loader) {
		return await loader.load(ENTITY_TYPE, PlayerModel, PlayerMaterial, PlayerTexture);
	}
}

EntityPlayer.type = "player";

export default EntityPlayer;
