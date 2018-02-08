import {MeshLine, MeshLineMaterial} from "three.meshline";
import {Mesh} from "three";

export default function draw(maxX, maxY, unit) {
	const halfSize = unit / 2;
	const vertices = [];

	for(let x = -halfSize; x <= maxX + halfSize; x++) {
		vertices.push(x, 0, -halfSize, x, 1, maxY + halfSize);
	}

	for(let y = -halfSize; y <= maxY + halfSize; y++) {
		vertices.push(-halfSize, 0, y, maxX + halfSize, 1, y);
	}

	const material = new MeshLineMaterial({
		lineWidth: 10
	});

	const line = new MeshLine();
	line.setGeometry(vertices);

	return new Mesh(line.geometry, material);
}
