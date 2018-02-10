import {
	AmbientLight,
	DirectionalLight,
	DoubleSide,
	Fog,
	Mesh,
	MeshBasicMaterial,
	Object3D,
	PCFSoftShadowMap,
	PerspectiveCamera,
	PlaneGeometry,
	RepeatWrapping,
	Scene,
	TextureLoader,
	WebGLRenderer
} from "three";

import loadPromise from "../utils/LoadPromise";
import WorldTexture from "../../images/texture.png";
import WindowResize from "../utils/WindowResize";

class Renderer {
	constructor(world) {
		this.camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.light = new AmbientLight(0xeeeeee, .4);
		this.directionalLight = new DirectionalLight(0xffffff, .9);
		this.scene = new Scene();
		this.terrain = new Object3D();

		this.playerModel = null;
		this.renderer = new WebGLRenderer({antialias: true});
		this.world = world;
		this.windowResize = new WindowResize(this.renderer, this.camera);
		this.terrain = new Object3D();

		this.init();
	}

	async init() {
		this.renderer.setClearColor(0x303030, 1.0);
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = PCFSoftShadowMap;

		const texture = await loadPromise(new TextureLoader, WorldTexture);
		texture.wrapS = texture.wrapT = RepeatWrapping;

		const repeat = Math.ceil(Math.max(this.world.width / 1024, this.world.height / 1024)) * 4;
		texture.repeat.set(repeat, repeat);
		const floorMaterial = new MeshBasicMaterial( { map: texture, side: DoubleSide } );
		const floorGeometry = new PlaneGeometry(this.world.width * 1.2, this.world.height * 1.2, 1, 1);
		const floor = new Mesh(floorGeometry, floorMaterial);
		floor.position.x = this.world.width / 2;
		floor.position.y = -0.1;
		floor.position.z = this.world.height / 2;
		floor.rotation.x = Math.PI / 2;
		floor.receiveShadow = true;
		this.terrain.add(floor);

		this.directionalLight.position.x = this.world.width / 2;
		this.directionalLight.position.y = 1000;
		this.directionalLight.position.z = this.world.height / 2 - 1000;
		this.directionalLight.target.x = this.world.width / 2;
		this.directionalLight.target.y = 0;
		this.directionalLight.target.z = this.world.height / 2;
		this.directionalLight.castShadow = true;

		this.directionalLight.shadow.camera.near = 0.1;
		this.directionalLight.shadow.camera.far = 1000;

		this.scene.add(this.terrain);
		this.scene.add(this.directionalLight);
		this.scene.add(this.light);
		this.scene.add(this.camera);

		this.scene.fog = new Fog(0x404040, 10, 1500);

		document.querySelector('#game').appendChild(this.renderer.domElement);
	}

	bind(model) {
		this.playerModel = model;
		this.directionalLight.target = model;

		this.camera.position.set(model.position.x + 0, model.position.y + 200, model.position.z - 100);
		this.camera.lookAt(this.playerModel.position);
	}

	tick() {
		this.renderer.render(this.scene, this.camera);
	}
}

export default Renderer;
