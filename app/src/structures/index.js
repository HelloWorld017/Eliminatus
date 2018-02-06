import StructureBarrel from "./StructureBarrel";
import StructureHeadquater from "./StructureHeadquater";
import StructureLamp from "./StructureLamp";
import StructureOre from "./StructureOre";
import StructureRock from "./StructureRock";
import StructureStone from "./StructureStone";
import StructureTree from "./StructureTree";
import StructureTurret from "./StructureTurret";

export default async function loadStructures(modelLoader) {
	const structures = [
		StructureBarrel,
		StructureHeadquater,
		StructureLamp,
		StructureOre,
		StructureRock,
		StructureStone,
		StructureTree,
		StructureTurret
	];
	const structuresByType = {};

	for(const structure of structures) {
		structuresByType[structure.type] = structure;
		await structure.registerModel(modelLoader);
	}

	return structuresByType;
};
