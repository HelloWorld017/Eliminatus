export default class Rotation {
	static rotateAll(shape, theta, origin={x: 0, y: 0}) {
		return shape.map(v => this.rotate(v, theta, origin));
	}

	static rotate(pos, theta, origin={x: 0, y: 0}) {
		const x = pos.x - origin.x;
		const y = pos.y - origin.y;

		const cos = Math.cos(theta);
		const sin = Math.sin(theta);

		return {
			x: x * cos - y * sin + origin.x,
			y: x * sin + y * cos + origin.y
		};
	}
}
