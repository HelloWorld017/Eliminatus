import EntityPlayer from "./EntityPlayer";

export default async function loadEntity(modelLoader) {
	const entities = [EntityPlayer];
	const entitiesByType = {};

	for(const entity of entities) {
		entitiesByType[entity.type] = entity;
		await entity.registerModel(modelLoader);
	}

	return entitiesByType;
};
