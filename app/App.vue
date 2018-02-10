<template>
	<section id="ui">
		<el-hud v-show="ingame"></el-hud>
		<transition name="fade">
			<el-waitings v-if="!ingame"></el-waitings>
		</transition>
	</section>
</template>

<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active {
		transition: all .5s ease;
	}

	.fade-enter {
		opacity: 0;
	}

	.fade-leave-to {
		opacity: 0;
	}
</style>

<script>
	import ElHud from "./components/ElHud.vue";
	import ElWaitings from "./components/ElWaitings.vue";

	export default {
		computed: {
			ingame() {
				return this.$store.state.ingame;
			}
		},

		components: {
			ElHud,
			ElWaitings
		}
	};
</script>
