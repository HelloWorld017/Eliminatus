class Collider {
	static getAxis(polygon) {
		const sides = [];

		polygon.reduce((p1, p2) => {
			const angle = Math.atan2(p1.x - p2.x, p1.y - p2.y);
			sides.push(angle);
			sides.push(angle + Math.PI / 2);

			return p2;
		}, polygon[polygon.length - 1]);

		return sides;
	}

	static convertAxis(axis){
		return point => {
			const pointAtan = Math.atan2(point.x, point.y);

			return Math.cos(axis - pointAtan) * Math.hypot(point.x, point.y);
		};
	}

	static testCollision(o1, o2) {
		const axes = Collider.getAxis(o1).concat(Collider.getAxis(o2));
		return axes.every(axis => {
			const mapIter = Collider.convertAxis(axis);

			const o1Points = o1.map(mapIter);
			const o2Points = o2.map(mapIter);

			return (
				Math.min(...o1Points) < Math.max(...o2Points) &&
				Math.min(...o2Points) < Math.max(...o1Points)
			);
		});
	}
}

export default Collider;
