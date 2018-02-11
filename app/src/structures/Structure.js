import {Group, Vector2} from "three";
import HealthBarRasterized from "../graphics/HealthBarRasterized";

class Structure {
	constructor(structName, world, x, y, z) {
		this.type = structName;
		this.world = world;
		this.game = world.game;

		this.hpbar = new HealthBarRasterized();

		this.model = new Group;
		this.model.add(world.modelLoader.get(structName));
		this.model.add(this.hpbar.model);

		this.maxHealth = 300;
		this._health = 300;

		['x', 'y', 'z'].forEach(key => {
			Object.defineProperty(this, key, {
				get: () => {
					return this.model.position[key] + this.boundMap[key];
				},

				set: (value) => {
					this.model.position[key] = value - this.boundMap[key];
				}
			})
		});

		this.x = x;
		this.y = y;
		this.z = z;

		this.hpbar.model.position.set(
			this.boundMap.x,
			this.boundMap.y + 60,
			this.boundMap.z
		);
	}

	attachAnimation(animation) {
		this.world.structureAnimations.push([this, animation]);
		animation.onAttach(this);
	}

	update(ctx) {
		this.animation.forEach(v => v.update(this, ctx));
	}

	getGridPosition() {
		return this.constructor.getGridPositionByAttr(
			this.x, 0, this.z, this.model.rotation.y
		);
	}

	get health() {
		return this._health;
	}

	set health(val) {
		this._health = val;
		this.hpbar.update(val / this.maxHealth);
	}

	static get positioningMethod() {
		return Math.ceil;
	}

	set rotation(rot) {
		const x = this.x;
		const y = this.y;
		const z = this.z;

		this.model.rotation.y = rot;

		this.x = x;
		this.y = y;
		this.z = z;
	}

	get rotation() {
		return this.model.rotation.y;
	}

	activateMenu() {

	}

	get boundMap() {
		return this.constructor.getBoundMap(this.rotation);
	}

	static async registerModel() {

	}

	static getGridPositionByAttr(x, y, z, rotation) {
		return [new Vector2(Math.floor(x / 40), Math.floor(z / 40))];
	}

	static canBuiltOn(world, x, y, z, rotation) {
		return this.getGridPositionByAttr(x, y, z, rotation).every((v) => {
			return !world.structures[world.getPositionTag(v)];
		});
	}

	static get width() {
		return 1;
	}

	static get height() {
		return 1;
	}

	static getBoundMap(rot) {
		return {x: 20, y: 0, z: 20};
	}
}

export default Structure;
