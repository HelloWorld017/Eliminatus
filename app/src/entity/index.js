import EntityPlayer from "./EntityPlayer";
import EntityPeerPlayer from "./EntityPeerPlayer";

export default async function loadEntity(modelLoader) {
	const entities = [
		EntityPlayer,
		EntityPeerPlayer
	];
	const entitiesByType = {};

	for(const entity of entities) {
		entitiesByType[entity.type] = entity;
		await entity.registerModel(modelLoader);
	}

	return entitiesByType;
};
