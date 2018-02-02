import {
	Mesh,
	MeshBasicMaterial
} from "three";

class TempModel {
	constructor(loader) {
		this.loader = loader;
	}

	get(modelName) {
		const geometry = this.loader.get(modelName).children[0].geometry;
		const material = new MeshBasicMaterial({color: 0x2196f3, wireframe: true});

		return new Mesh(geometry, material);
	}
}

export default TempModel;
