import ThreeOimo from "../physics/ThreeOimo";

class Entity {
	constructor(entityName, world, x, y, z) {
		this.type = entityName;
		this.world = world;
		this.game = world.game;

		this.model = world.modelLoader.get(entityName);
		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

		this.physicsModel = ThreeOimo.createBodyFromMesh(this.world.physicsWorld, this.model);

		this.health = 50;
		this.animation = [];
	}

	render() {

	}

	attachAnimation(animation) {
		this.animation.push(animation);
		animation.onAttach(this);
	}

	update(ctx) {
		ThreeOimo.updateObject3dWithBody(this.model, this.physicsModel);
		this.animation = this.animation.filter(v => {
			return v.update(this, ctx);
		});
	}

	static async registerModel() {

	}

	importFromTag(tags) {

	}
}

export default Entity;
