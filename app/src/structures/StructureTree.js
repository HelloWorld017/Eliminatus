import Structure from "./Structure";
import TreeModel from "../../models/objects/tree.obj";
import TreeMaterial from "../../models/objects/tree.mtl";
import TreeTexture from "../../models/objects/tree.png";

class StructureTree extends Structure{
	constructor(world, x, y, z) {
		super(StructureTree.type, world, x, y, z);
	}

	static async registerModel(loader) {
		return loader.load(StructureTree.type, TreeModel, TreeMaterial, TreeTexture);
	}
}

StructureTree.type = "tree";

export default StructureTree;
