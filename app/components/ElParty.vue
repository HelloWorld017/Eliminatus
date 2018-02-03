<template>
	<a class="el-party" href="javascript:" @click="join">
		<div class="el-info">
			<div class="el-title">{{party.title}}</div>
			<div class="el-players">{{party.current}}/{{party.max}}</div>
		</div>
		<div class="el-progress">
			<div class="el-progressbar" :style="{width: percentage}" :class="progClass"></div>
		</div>
	</a>
</template>

<style lang="less" scoped>
	.el-party {
		max-width: 768px;
		margin: 0 auto;
		display: flex;
		box-shadow: 0 2px 9px 2px rgba(0, 0, 0, .3);
		color: #404040;
		background: #fff;
		text-decoration: none;
		padding: 20px;

		.el-title {
			font-size: 1.35rem;
		}

		.el-players {
			margin-top: 5px;
			color: #707070;
		}

		.el-progress {
			margin-left: 50px;
			flex: 1;
			background: #f1f2f3;
			height: 30px;
			border-radius: 3px;
			//box-shadow: 0 2px 9px 1px rgba(0, 0, 0, .1);
		}

		.el-progressbar {
			&.low {
				background: #ff5722;
			}

			&.middle {
				background: #ffc107;
			}

			&.high {
				background: #8bc34a;
			}
			height: 100%;
			border-radius: 3px;
		}
	}
</style>

<script>
	export default {
		methods: {
			join() {
				eliminatus.socket.emit('match.join', this.party.id);
				this.$emit('join', this.party.id);
			}
		},

		computed: {
			ratio() {
				return this.party.current / this.party.max;
			},

			percentage() {
				return `${this.ratio * 100}%`;
			},

			progClass() {
				if(this.ratio < 40) return 'low';
				if(this.ratio < 75) return 'middle';
				return 'high';
			}
		},

		props: {
			party: {
				required: true
			}
		}
	};
</script>
