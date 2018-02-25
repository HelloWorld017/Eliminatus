<template>
	<section id="ingredients" class="ingredients" v-if="ingredients.length">
		<header class="header column">
			<div class="column-left">
				<h2>Ingredients</h2>
				<i class="mdi mdi-check-all" v-if="fulfill"></i>
				<i class="mdi mdi-minus-box-outline" v-else></i>
			</div>

			<div class="column-right">
			</div>
		</header>

		<div class="item column" v-for="ingredient in ingredients">
			<div class="column-left">
				<img :src="inventory[ingredient.name]" class="item-icon">
				<div class="item-bar" :style="getBarStyle(ingredient)">
					x{{ingredient.needed}}
				</div>
			</div>
			<div class="column-right">
				<i class="mdi mdi-checkbox-marked-outline" v-if="isFulfilled(ingredient)"></i>
				<div v-else>
					{{getNeededAmount(ingredient)}}
				</div>
			</div>
		</div>

		<div class="notice column" v-for="reason in inavailReasons">
			<i class="mdi mdi-alert-outline"></i>
			<div class="contents">
				{{reason}}
			</div>
		</div>

	</section>
</template>

<style lang="less">
	.ingredients {
		width: 400px;
		display: flex;
		font-family: 'Noto Sans CJK KR', sans-serif;
		flex-direction: column;

		.column {
			display: flex;
			height: 60px;
			margin-bottom: 25px;

			&.notice {
				background: #f44336;
				color: #fff;
				padding: 8px 20px;
				border-radius: 5px;
				align-items: center;

				.contents {
					margin: 20px;
					font-style: italic;
				}
			}

			&.item:nth-child(3n) {
				margin-left: 35px;
			}

			&.item:nth-child(3n + 1) {
				margin-left: 65px;
			}

			&.item:nth-child(3n + 2) {
				margin-left: 5px;
			}

			&.header .column-left{
				background: #202020;
				justify-content: space-between;
				padding: 5px 20px;
				font-weight: 100;
				line-height: 40px;

				h2 {
					margin: 0;
					font-weight: 100;
					font-size: 1.5rem;
				}

				.mdi {
					font-size: 1.5rem;
				}
			}

			.column-left {
				display: flex;
				align-items: center;
				flex: 1;
				color: #fff;

				.item-icon {
					width: 60px;
					height: 60px;
				}

				.item-bar {
					background: #202020;
					margin-left: 10px;
					padding-left: 20px;
					min-width: 100px;
					height: 40px;
					line-height: 40px;
					font-weight: 100;
					font-size: 25px;
				}
			}

			.column-right {
				color: #202020;
				width: 80px;
				font-weight: 600;
				display: flex;
				align-items: center;

				&>* {
					flex: 1;
					margin-left: 10px;
					margin-right: 10px;
					text-align: center;
					height: 30px;
					background: rgba(255, 255, 255, .4);
					line-height: 30px;
				}
			}
		}
	}
</style>

<script>
	import InventoryAssets from "../src/graphics/InventoryAssets";
	import formatNumber from "../src/utils/FormatNumber";

	export default {
		computed: {
			inventory() {
				return InventoryAssets;
			},

			playerInventory() {
				return this.$store.state.inventory;
			},

			ingredients() {
				return this.$store.state.ingredients;
			},

			inavailReasons() {
				return this.$store.state.buildInavailReasons;
			},

			fulfill() {
				return this.ingredients.every(v => this.isFulfilled(v));
			},

			neededSum() {
				return this.ingredients.reduce((prev, curr) => prev + curr.needed, 0);
			}
		},

		methods: {
			isFulfilled(ingredient) {
				return ingredient.needed <= (this.playerInventory[ingredient.name] || 0);
			},

			getBarStyle(ingredient) {
				return {
					width: `${(ingredient.needed / this.neededSum) * 100}%`
				};
			},

			getNeededAmount(ingredient) {
				return `+${formatNumber(ingredient.needed - (this.playerInventory[ingredient.name] || 0))}`
			}
		}
	};
</script>
