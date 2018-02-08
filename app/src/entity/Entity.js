class Entity {
	constructor(entityName, world, x, y, z) {
		this.type = entityName;
		this.world = world;
		this.game = world.game;

		this.model = world.modelLoader.get(entityName);
		this.model.position.x = x;
		this.model.position.y = y;
		this.model.position.z = z;

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
