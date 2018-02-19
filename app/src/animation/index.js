import AnimationBuild from "./AnimationBuild";
import AnimationDestruction from "./AnimationDestruction";
import AnimationPlayerPick from "./AnimationPlayerPick";

const exportMap = {};

[
	AnimationBuild,
	AnimationDestruction,
	AnimationPlayerPick
].forEach((v) => {
	exportMap[v.animationId] = v;
});

export default exportMap;
