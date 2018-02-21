import AnimationPlayerPick from "../animation/AnimationPlayerPick";
import {CSS3DSprite} from "../graphics/CSS3D";
import Entity from "./Entity";
import MathUtils from "../math/MathUtils";
import PlayerModel from "../../models/entities/player.obj";
import PlayerMaterial from "../../models/entities/player.mtl";
import PlayerTexture from "../../models/entities/player.png";
import {MeshBasicMaterial, Raycaster, Vector2, Vector3} from "three";
import TempModel from "../utils/TempModel";

const ENTITY_TYPE = "player";

class EntityPlayer extends Entity {
	constructor(world, x, y, z) {
		super(ENTITY_TYPE, world, x, y, z);

		this.removeMode = false;
		this.removeMaterial = new MeshBasicMaterial({color: 0xef5350, transparent: true, opacity: .6});
		this.previousModel = null;
		this.previousMaterial = null;

		this.buildMode = false;
		this.buildKeymap = new Map([
			['1', 'factory_core'],
			['2', 'engineering_core'],
			['3', 'generator_core'],
			['4', 'extractor_core'],
			['5', 'transmitter_core'],
			['6', 'repair_core'],
			['7', 'turret'],
			['8', 'wall'],
			['9', 'wall_rot']
		]);

		this.keyMap = new Map([
			['`', () => this.cancelBuilding()],
			['r', () => this.buildRotation = MathUtils.mod(this.buildRotation - Math.PI / 2, Math.PI * 2)],
			['-', () => this.startRemoveMode()]
		]);

		this.raycaster = new Raycaster;
		this.mouse = new Vector2;
		this.buildPoint = new Vector3;
		this.buildRotation = 0;
		this.tempModel = undefined;
		this.tempModelLoader = new TempModel(this.world.modelLoader);

		this.ingredientsView = new CSS3DSprite(document.querySelector('#ingredient-ui'));
		this.ingredientsView.scale.set(0.4, 0.4, 0.4);

		this.inventory = {};
		this.lastPick = 0;
		this.pickInterval = 800;
	}

	cancelRemoving() {
		if(!this.removeMode) return;
		if(this.previousModel && this.world.structures[this.previousModel]) {
			this.world.structures[this.previousModel].structModel.material = this.previousMaterial;
		}
		this.removeMode = false;
	}

	cancelBuilding() {
		if(this.removeMode) this.cancelRemoving();
		if(!this.buildMode) return;

		this.buildMode = false;
		this.world.renderer.scene.remove(this.tempModel);
		this.world.renderer.sceneSpriteHtml.remove(this.ingredientsView);
	}

	confirmBuilding() {
		if(!this.buildMode) return;
		const structure = this.world.structureByType[this.buildMode];

		if(!structure.canBuiltOn(this.world, this.buildPoint.x, 0, this.buildPoint.z, this.buildRotation))
		return;

		this.game.socket.emit('game.structure.build', {
			type: this.buildMode,
			x: this.buildPoint.x,
			y: this.buildPoint.z,
			rotation: this.buildRotation
		});
		this.cancelBuilding();
	}

	startRemoveMode() {
		this.cancelBuilding();
		this.removeMode = true;
	}

	importFromTag(tags) {
		if(tags.inventory) {
			this.inventory = tags.inventory;
			this.game.store.state.inventory = tags.inventory;
		}
	}

	update(ctx) {
		super.update(ctx);

		if(ctx.keyboard.pressingKeys.get('a')) {
			this.model.rotation.y += Math.PI / 60;
		} else if(ctx.keyboard.pressingKeys.get('d')) {
			this.model.rotation.y -= Math.PI / 60;
		}

		let speedModifier = 0;
		let speed = 4;

		if(ctx.keyboard.pressingKeys.get('w')) {
			speedModifier = 1;
		} else if(ctx.keyboard.pressingKeys.get('s')) {
			speedModifier = -1;
		}

		ctx.keyboard.events.forEach(({type, key}) => {
			if(type !== 'keyboard:keydown') return;

			if(this.keyMap.get(key) !== undefined) {
				this.keyMap.get(key)();
			}

			if(this.buildKeymap.get(key) !== undefined) {
				if(this.buildMode || this.removeMode) this.cancelBuilding();
				this.buildMode = this.buildKeymap.get(key);
				this.tempModel = this.tempModelLoader.get(this.buildMode);

				const structureIngredients = this.world.structureByType[this.buildMode].ingredients;

				this.game.store.state.ingredients = Object.keys(structureIngredients).map(k => {
					return {
						name: k,
						needed: structureIngredients[k]
					};
				});

				this.world.renderer.sceneSpriteHtml.add(this.ingredientsView);
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

			const xMovement = sin * speed;
			const yMovement = cos * speed;

			const revertPosition = {
				x: this.model.position.x - xMovement,
				z: this.model.position.z - yMovement
			};

			this.model.position.x += xMovement * speedModifier;
			this.model.position.z += yMovement * speedModifier;

			let collideX = 0, collideY = 0;

			const collidesObjects = this.checkCollisionInChunk();

			collidesObjects.forEach((collidesObject, i) => {
				const outputCenter = collidesObject.aabb.getCenter();
				const outputTheta = Math.atan2(
					outputCenter.z - revertPosition.z,
					outputCenter.x - revertPosition.x
				);

				 collideX -= Math.cos(outputTheta) * speed * 1.5;
				 collideY -= Math.sin(outputTheta) * speed * 1.5;
			});

			if(Math.abs(xMovement) < Math.abs(collideX)) {
				collideX = Math.sign(collideX) * Math.abs(xMovement);
			}

			if(Math.abs(yMovement) < Math.abs(collideY)) {
				collideY = Math.sign(collideY) * Math.abs(yMovement);
			}

			if(Math.abs(xMovement * speedModifier + collideX) > Math.abs(xMovement)) {
				collideX = 0;
			}

			if(Math.abs(yMovement * speedModifier + collideY) > Math.abs(yMovement)) {
				collideY = 0;
			}
			this.model.position.x += collideX;
			this.model.position.z += collideY;
		}

		if(this.buildMode) {
			this.mouse.x = ctx.mouse.x / window.innerWidth * 2 - 1;
			this.mouse.y = ctx.mouse.y / window.innerHeight * -2 + 1;

			this.raycaster.setFromCamera(this.mouse, this.world.renderer.camera);

			const intersects = this.raycaster.intersectObjects(this.world.renderer.terrain.children, true);

			if(intersects.length > 0) {
				const point = intersects.pop().point;
				const myModel = this.model.position;

				if(Math.hypot(point.x - myModel.x, point.z - myModel.z) > 200) {
					const theta = Math.atan2(point.z - myModel.z, point.x - myModel.x);
					point.x = myModel.x + Math.cos(theta) * 200;
					point.z = myModel.z + Math.sin(theta) * 200;
				}

				const boundMap = this.world.structureByType[this.buildMode].getBoundMap(this.buildRotation);
				const gridifyFunction = this.world.structureByType[this.buildMode].positioningMethod;
				point.x = gridifyFunction(point.x / 40) * 40;
				point.y = 0;
				point.z = gridifyFunction(point.z / 40) * 40;

				this.ingredientsView.position.copy((new Vector3()).copy(point).add(new Vector3(50, 80, 0)));

				this.buildPoint = point;
				this.tempModel.position.x = point.x - boundMap.x;
				this.tempModel.position.y = point.y - boundMap.y;
				this.tempModel.position.z = point.z - boundMap.z;
				this.tempModel.rotation.y = this.buildRotation;

				if(!this.world.structureByType[this.buildMode].canBuiltOn(
					this.world,
					point.x,
					0,
					point.z,
					this.buildRotation
				)) {
					this.tempModel.material.color.setHex(0xff5722);
				} else {
					this.tempModel.material.color.setHex(0x03a9f4);
				}
			}
		} else if (this.removeMode) {
			this.mouse.x = ctx.mouse.x / window.innerWidth * 2 - 1;
			this.mouse.y = ctx.mouse.y / window.innerHeight * -2 + 1;

			this.raycaster.setFromCamera(this.mouse, this.world.renderer.camera);

			const intersects = this.raycaster.intersectObjects(
				this.getMergedChunkStructures().map(v => v.structModel), true
			);

			if(intersects.length > 0) {
				const {object} = intersects.shift();
				if(object.userData.eliminatusStructureData) {
					const tag = this.world.getPositionTag(object.userData.eliminatusStructureData);

					if(this.previousModel !== tag) {
						if(this.previousModel && this.world.structures[this.previousModel]) {
							this.world.structures[this.previousModel].structModel.material = this.previousMaterial;
						}

						this.previousModel = tag;
						this.previousMaterial = this.world.structures[tag].structModel.material;

						this.world.structures[tag].structModel.material = this.removeMaterial;
					}
				}

			} else if (this.previousModel) {
				if(this.world.structures[this.previousModel]) {
					this.world.structures[this.previousModel].structModel.material = this.previousMaterial;
				}
				this.previousModel = null;
				this.previousMaterial = null;
			}
		}

		if(ctx.keyboard.pressingKeys.get(' ')) {
			if(Date.now() - this.lastPick >= this.pickInterval) {
				const intersects = this.getMergedChunkStructures().reduce((prev, curr) => {
					const deltaX = curr.model.position.x - this.model.position.x; // Because of boundmap
					const deltaZ = curr.model.position.z - this.model.position.z;

					const distance = Math.hypot(deltaX, deltaZ);
					if(distance > 80) return prev;

					const theta = Math.atan2(deltaZ, -deltaX);
					let deltaTheta = MathUtils.mod(this.model.rotation.y - theta + Math.PI / 2, Math.PI * 2);
					if(deltaTheta > Math.PI) deltaTheta = Math.PI * 2 - deltaTheta;
					if(deltaTheta > Math.PI / 4) return prev;

					prev.push([distance, curr]);
					return prev;
				}, []).sort((n1, n2) => n1[0] - n2[0]);

				intersects.every(([distance, pickingObject]) => {
					const pickingGrid = pickingObject.getGridPosition()[0];

					const pickingAnimation = new AnimationPlayerPick({
						targetPosition: {
							x: pickingObject.x,
							z: pickingObject.z
						}
					});

					this.attachAnimation(pickingAnimation);

					this.game.socket.emit('game.structure.pick', {
						x: pickingGrid.x,
						z: pickingGrid.y
					});

					this.lastPick = Date.now();
					return false;
				});
			}
		}

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
