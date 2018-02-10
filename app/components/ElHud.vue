<template>
	<section class="bottom-layout">
		<div class="minimap-container">
			<div class="minimap-backdrop"></div>
			<canvas id="minimap"></canvas>
		</div>
	</section>
</template>

<style lang="less" scoped>
	.minimap-container {
		position: fixed;
		bottom: 0;
		right: 0;
		width: 10vw;
		height: 10vw;
		padding: 10px;
	}

	.minimap-backdrop {
		background: rgba(0, 0, 0, .3);

		&, #minimap {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
		}
	}
</style>

<script>
	export default {};
</script>
