<template>
	<section class="hud-layout">
		<div class="minimap-container">
			<div class="minimap-backdrop"></div>
			<canvas id="minimap"></canvas>
		</div>

		<div class="inventory-container">
			<div class="inventory-item" v-for="(amount, item) in inventory" :key="item">
				<img class="inventory-image" :src="inventoryImages[item]">
				<span class="inventory-amount">
					{{formatNumber(amount)}}
				</span>
			</div>

			<div class="inventory-item" v-for="i in leftInventorySize" :key="i">
				<img class="inventory-image" :src="inventoryImages.empty">
			</div>
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

	.inventory-container {
		position: fixed;
		top: 50%;
		width: 80px;
		height: 200px;
		right: 0;
		transform: translateY(-50%);
		padding: 5px;
		padding-left: 7px;

		display: flex;
		flex-direction: column;
		justify-content: center;
		background: rgba(0, 0, 0, .3);

		.inventory-item {
			display: flex;
			justify-content: space-between;
			align-items: baseline;

			width: 100%;
			height: 60px;

			.inventory-image {
				width: 50px;
				height: 50px;
				margin-right: -10px;
			}

			.inventory-amount {
				color: #fff;
				font-family: "Saira", sans-serif;
			}
		}
	}
</style>

<script>
	import formatNumber from "../src/utils/FormatNumber";
	import InventoryAssets from "../src/graphics/InventoryAssets";

	export default {
		data() {
			return {
				inventoryImages: InventoryAssets
			};
		},

		methods: {
			formatNumber
		},

		computed: {
			leftInventorySize() {
				return 3 - Object.keys(this.inventory).length;
			},

			inventory() {
				return this.$store.state.inventory;
			}
		}
	};
</script>
