import EntityPlayer from "./entity/EntityPlayer";
import KeyboardInput from "./middlewares/KeyboardInput";
import MouseInput from "./middlewares/MouseInput";
import MouseMovement from "./middlewares/MouseMovement";
import Vuex from 'vuex';
import World from "./world/World";

class Eliminatus {
	constructor() {
		this.world = new World(this);
		this.middlewares = [
			new MouseInput().handler,
			new KeyboardInput().handler,
			MouseMovement
		];
		this.store = new Vuex.Store({
			state: {
				health: 10,
				maxHealth: 10,
				buildMode: false,
				buildingObject: undefined,
				followCamera: false
			}
		});

		this.updateBound = this.update.bind(this);
		this.renderTickBound = this.renderTick.bind(this);

		document.querySelector('#game').addEventListener('click', () => this.requirePointerLock());
	}

	async init() {
		await this.world.init();

		this.player = new EntityPlayer(this.world, 0, 0, 0);
		this.world.spawnEntity(-1, this.player);
		this.world.renderer.bind(this.player.model);

		this.update();
		this.renderTick();
	}

	requirePointerLock() {
		document.querySelector('#game').requestPointerLock();
	}

	renderTick() {
		this.world.renderer.tick();
		requestAnimationFrame(this.renderTickBound);
	}

	update() {
		const ctx = {};
		this.middlewares.forEach((v) => v(this, ctx));
		this.world.tick(ctx);

		setTimeout(this.updateBound, 20);
	}
}

export default Eliminatus;
