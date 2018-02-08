import EntityPlayer from "./entity/EntityPlayer";
import KeyboardInput from "./middlewares/KeyboardInput";
import MouseInput from "./middlewares/MouseInput";
import MouseMovement from "./middlewares/MouseMovement";
import World from "./world/World";

class Eliminatus {
	constructor(store, options) {
		this.world = new World(this, options);
		this.middlewares = [
			new MouseInput().handler,
			new KeyboardInput().handler,
			MouseMovement
		];
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

	updateEntityAttributeByEID(data, updateSelf=false) {
		if(data.type === 'player' && data.tags.uid === this.player.uid) {
			if(!updateSelf) return;

			data.id = -1;
		}
		const entity = this.world.entities.get(data.id);

		if(!entity) return;

		this.updateEntityAttribute(data, entity);
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
		});

		this.socket.on('entity.attribute', v => this.updateEntityAttributeByEID(v, true));
		this.socket.on('structure.spawn', obj => {
			const structureObject = this.createStructureFromData(obj);
			this.world.addStructure(structureObject);
		});
	}
}

export default Eliminatus;
