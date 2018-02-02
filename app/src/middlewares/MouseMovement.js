export default function handle({world}, ctx) {
	const camera = world.renderer.camera;

	if(ctx.mouse.x < 30) {
		camera.position.x += 4.1;
	} else if(ctx.mouse.x > window.innerWidth - 30) {
		camera.position.x -= 4.1;
	}

	if(ctx.mouse.y < 30) {
		camera.position.z += 4.1;
	} else if(ctx.mouse.y > window.innerHeight - 30) {
		camera.position.z -= 4.1;
	}

	if(ctx.mouse.events) ctx.mouse.events.forEach((v) => {
		if(v.type === 'mouse:wheel') {
			if(v.deltaY > 0) {
				camera.position.y = Math.min(500, camera.position.y + 8);
			} else {
				camera.position.y = Math.max(150, camera.position.y - 8);
			}
		}
	});
};
