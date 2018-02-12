const radianToDegree = rad => rad / Math.PI * 180;

class ThreeOimo {
	static createBodyFromMesh(world, mesh, userOptions={}) {
		if(!mesh.geometry && mesh.children) mesh = mesh.children[0];
		if(!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox();
		const boundBox = mesh.geometry.boundingBox;
		const size = boundBox.getSize();

		const options = {
			type: 'box',
			size: [
				size.x * mesh.scale.x,
				size.y * mesh.scale.y,
				size.z * mesh.scale.z
			],
			pos: mesh.position.toArray(),
			rot: mesh.rotation.toArray().slice(0, 3).map(radianToDegree),
			world,
			move: true
		};

		Object.keys(userOptions).forEach(name => options[name] = userOptions[name]);

		return world.add(options);
	}

	static updateObject3dWithBody(object3d, body) {
		object3d.position.copy(body.getPosition());

		const bodyQuaternion = body.getQuaternion()
		object3d.quaternion.set(
			bodyQuaternion.x,
			bodyQuaternion.y,
			bodyQuaternion.z,
			bodyQuaternion.w
		);
	}
}

export default ThreeOimo;
