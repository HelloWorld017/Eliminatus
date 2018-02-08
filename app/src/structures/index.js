import StructureBarrel from "./StructureBarrel";
import StructureEngineeringCore from "./StructureEngineeringCore";
import StructureFactoryCore from "./StructureFactoryCore";
import StructureGeneratorCore from "./StructureGeneratorCore";
import StructureHeadquater from "./StructureHeadquater";
import StructureLamp from "./StructureLamp";
import StructureOre from "./StructureOre";
import StructureRepairCore from "./StructureRepairCore";
import StructureRock from "./StructureRock";
import StructureRotatedWall from "./StructureRotatedWall";
import StructureStone from "./StructureStone";
import StructureTree from "./StructureTree";
import StructureTurret from "./StructureTurret";
import StructureWall from "./StructureWall";

export default async function loadStructures(modelLoader) {
	const structures = [
		StructureBarrel,
		StructureEngineeringCore,
		StructureFactoryCore,
		StructureGeneratorCore,
		StructureHeadquater,
		StructureLamp,
		StructureOre,
		StructureRepairCore,
		StructureRock,
		StructureRotatedWall,
		StructureStone,
		StructureTree,
		StructureTurret,
		StructureWall
	];
	const structuresByType = {};

	for(const structure of structures) {
		structuresByType[structure.type] = structure;
		await structure.registerModel(modelLoader);
	}

	return structuresByType;
};
