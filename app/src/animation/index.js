import AnimationBuild from "./AnimationBuild";
import AnimationPlayerMove from "./AnimationPlayerMove";

const exportMap = {};

[
	AnimationBuild,
	AnimationPlayerMove
].forEach((v) => {
	exportMap[v.animationId] = v;
});

export default exportMap;
