import AnimationBuild from "./AnimationBuild";
import AnimationPlayerPick from "./AnimationPlayerPick";

const exportMap = {};

[
	AnimationBuild,
	AnimationPlayerPick
].forEach((v) => {
	exportMap[v.animationId] = v;
});

export default exportMap;
