import CameraMovement from "./middlewares/CameraMovement";
import EntityPlayer from "./entity/EntityPlayer";
import KeyboardInput from "./middlewares/KeyboardInput";
import MouseInput from "./middlewares/MouseInput";
import Minimap from "./middlewares/Minimap";
import World from "./world/World";

class Eliminatus {
	constructor(store, options) {
		this.world = new World(this, options);
		this.middlewares = [];
		this.store = store;

		this.updateBound = this.update.bind(this);
		this.renderTickBound = this.renderTick.bind(this);
		this.socket = eliminatus.socket;

		document.querySelector('#game').addEventListener('click', () => this.requirePointerLock());
	}

	async init(uid) {
		await this.world.init();

		this.player = new EntityPlayer(this.world, 0, 0, 0);
		this.player.uid = uid;
		this.world.spawnEntity(-1, this.player);
		this.world.renderer.bind(this.player.model);

		this.middlewares = [
			new MouseInput().handler,
			new KeyboardInput().handler,
			new CameraMovement().handler,
			new Minimap(this).handler
		];

		this.update();
		this.renderTick();

		this.attachListeners();

		this.socket.emit('world.notify.request', {});
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

	announce(tag, payload) {
		this.socket.emit(tag, payload);
	}

	createAnimationFromData(ani) {
		const animationClass = this.world.animationsByType[ani.type];
		const animation = new animationClass(ani.args);

		return animation;
	}

	createEntityFromData(ent) {
		if(ent.type === 'player' && ent.tags.uid === this.player.uid) return null;
		if(ent.type === 'player') ent.type = 'player.peer';

		const entityClass = this.world.entitiesByType[ent.type];
		const entityObject = new entityClass(this.world, ent.x, ent.y, ent.z);
		entityObject.model.rotation.y = ent.rotation;
		entityObject.health = ent.health;
		entityObject.importFromTag(ent.tags);

		return entityObject;
	}

	createStructureFromData(str) {
		const structureClass = this.world.structureByType[str.type];
		const structureObject = new structureClass(this.world, str.x, 0, str.y);
		structureObject.rotation = str.rotation;
		structureObject.health = str.health;

		return structureObject;
	}

	updateEntityAttribute(data, entity) {
		entity.model.position.x = data.x;
		entity.model.position.y = data.y;
		entity.model.position.z = data.z;

		entity.model.rotation.y = data.rotation;

		entity.health = data.health;
		entity.importFromTag(data.tags);
	}

	updateStructure(data, structure) {
		structure.health = data.health;
	}

	updateEntityAttributeByEID(data, updateSelf=false) {
		if(data.type === 'player' && data.tags.uid === this.player.uid) {
			if(!updateSelf) return;

			data.id = -1;
		}
		const entity = this.world.entities.get(data.id);

		if(!entity) return;

		this.updateEntityAttribute(data, entity);
	}

	updateStructureByPosition(data) {
		const structure = this.world.structures[this.world.getPositionTag(data.x, data.y)];

		if(!structure) return;

		this.updateStructure(data, structure);
	}

	attachListeners() {
		this.socket.on('world.structures', (structures) => {
			structures.forEach(str => {
				const structureObject = this.createStructureFromData(str);
				this.world.addStructure(structureObject);
			});
		});

		this.socket.on('world.entities', (entities) => {
			entities.forEach(ent => {
				const entityObject = this.createEntityFromData(ent);

				if(entityObject === null) {
					this.updateEntityAttribute(ent, this.player);
					this.world.renderer.bind(this.player.model);
					return;
				}

				this.world.spawnEntity(ent.id, entityObject);
			});
		});

		this.socket.on('world.tick', ({entityUpdate, structureUpdate}) => {
			entityUpdate.forEach(v => this.updateEntityAttributeByEID(v, false));
			structureUpdate.forEach(v => this.updateStructureByPosition(v));
		});

		this.socket.on('entity.attribute', v => this.updateEntityAttributeByEID(v, true));
		this.socket.on('structure.spawn', obj => {
			const structureObject = this.createStructureFromData(obj.structure);
			this.world.addStructure(structureObject);
			obj.animate.forEach(v => {
				structureObject.attachAnimation(this.createAnimationFromData(v));
			});
		});
	}
}

export default Eliminatus;
