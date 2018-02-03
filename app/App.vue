<template>
	<section id="ui">
		<transition name="fade">
			<el-hud v-if="ingame"></el-hud>
			<el-waitings v-else></el-waitings>
		</transition>
	</section>
</template>

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
