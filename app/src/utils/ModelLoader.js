import {Color, TextureLoader} from "three";
import MTLLoader from "../graphics/MTLLoader";
import OBJLoader from "../graphics/OBJLoader";
import loadPromise from "./LoadPromise";

class ModelLoader {
	constructor() {
		this.models = {};
	}

	get(name) {
		return this.models[name].clone();
	}

	async load(name, objPath, mtlPath, pngPath) {
		const mtlLoader = new MTLLoader();
		mtlLoader.setTexturePath(pngPath + '#'); // Remove path of mtl, use only pngPath
		const material = await loadPromise(mtlLoader, mtlPath);
		material.preload();

		const objLoader = new OBJLoader();
		objLoader.setMaterials(material);
		const model = await loadPromise(objLoader, objPath);

		const texture = await loadPromise(new TextureLoader, pngPath);

		model.children[0].material.normalMap = texture;
		model.children[0].material.ambient = new Color(0xffffff);
		model.children[0].geometry.computeVertexNormals(true);
		model.children[0].geometry.computeFaceNormals(true);
		model.children[0].geometry.computeVertexNormals(true);

		this.models[name] = model;

		return model.clone();
	}
}

export default ModelLoader;
