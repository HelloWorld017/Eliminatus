<template>
	<section class="el-waitings">
		<transition name="fade-slide" mode="out-in">
			<div class="sect" v-if="!name" key="login">
				<h2>Login</h2>
				<form class="input-name" @submit="use">
					<div class="input-hint">
						<input type="text" placeholder="Username" ref="input"
							id="username" @keyup="verify" maxlength="10">
						<label for="username"></label>
					</div>

					<button v-ripple="'rgba(255, 255, 255, 0.35)'">Use</button>
				</form>
			</div>

			<div class="sect" v-else-if="!party" key="select">
				<h2>Login &gt; Select</h2>
				<div class="header">
					<h3>Select Party</h3>

					<div class="search-input">
						<i class="mdi mdi-magnify search-icon"></i>
						<input id="search" type="text" placeholder="Search" v-model="search">
						<label for="search"></label>
					</div>
				</div>

				<transition-group name="parties" tag="div" class="parties">
					<el-party v-for="gameParty in blurryParty" :key="gameParty.id" :party="gameParty" @join="join">
					</el-party>
				</transition-group>
				<div class="divider"></div>
				<div class="input-party-info">
					<h3>Create Party</h3>
					<form class="create" @submit="create">
						which title is
						<div class="input-hint">
							<input id="title" type="text" placeholder="Title"
								ref="title" @keyup="verify" maxlength="20">
							<label for="title"></label>
						</div>
						, with
						<div class="input-hint">
							<input id="count" type="number" placeholder="n"
								ref="max" min="1" max="6" @change="verifyNum">
							<label for="count"></label>
						</div>
						Player(s)

						<button class="create" v-ripple="'rgba(255, 255, 255, 0.35)'">
							Create
						</button>
					</form>
				</div>
			</div>

			<div class="sect" v-else key="wait">
				<h2>Login &gt; Select &gt; Wait</h2>
				<h3>Party <span class="tag">{{myGame.title}}</span></h3>
				Tag: {{myGame.id}}
				<h3>Users</h3>
				<div class="users">
					<transition-group name="users" class="users-list" tag="div">
						<div v-for="user in myGame.users" class="user" :key="user[0]">
							{{user[1]}}
						</div>
					</transition-group>
					<div class="status">
						{{myGame.current}} / {{myGame.max}}
					</div>
				</div>
				<h3>Actions</h3>
				<button class="exit" type="button" v-ripple="'rgba(255, 255, 255, 0.35)'" @click="exit">
					Exit
				</button>
			</div>
		</transition>
	</section>
</template>

<style scoped lang="less">
	.el-waitings {
		width: 80vw;
		height: 80vh;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		padding: 30px;
		box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, .5);
		display: flex;
		flex-direction: column;
		overflow-x: hidden;

		*:not(.mdi) {
			font-family: 'Roboto', sans-serif;
		}

		h2, h3 {
			font-weight: 100;
		}

		h2 {
			font-size: 2rem;
		}

		h3 {
			font-size: 1.3rem;
			font-weight: 300;
		}
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.sect {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		opacity: 1;
		transform: none;
	}

	.search-input {
		box-shadow: 0 3px 6px 1px rgba(0, 0, 0, .3);
		display: flex;
		align-items: center;
		padding: 10px;

		.input-hint;

		.search-icon {
			margin-right: 10px;
			border-right: 1px solid #ccc;
			padding-right: 10px;
		}

		input {
			border: none;
		}
	}

	.input-name, .create {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.radios {
		display: flex;
		align-items: center;

		>* {
			margin: 5px;
		}
	}

	.tag {
		padding: 5px;
		border-radius: 3px;
		background: #e1e2e3;
	}

	.status {
		margin: 5px;
	}

	.input-hint {
		margin: 10px;
		position: relative;

		input {
			border: none;
			border-bottom: 2px solid #505050;
			padding: 10px;
			color: #505050;
			outline: none;

			& + label {

				&::after {
					content: '';
					display: block;
					position: absolute;
					background: #2196f3;
					width: 100%;
					height: 2px;
					bottom: 0;
					left: 0;
					transition: transform .5s ease;
					transform: scaleX(0);
				}
			}

			&:focus + label::after {
				transform: scaleX(1);
			}
		}
	}

	.divider {
		margin-top: 30px;
		border-width: 2px;
		border-style: solid;
		border-color: #c0c0c0;
		position: relative;

		&::after {
			content: 'OR';
			color: #c0c0c0;
			display: inline-block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			background: #fff;
			padding: 0 10px;
		}
	}

	.fade-slide-enter-active, .fade-slide-leave-active {
		transition: all .5s ease;
	}

	.fade-slide-enter {
		opacity: 0;
		transform: translateX(80vw);
	}

	.fade-slide-leave-to {
		opacity: 0;
		transform: translateX(-80vw);
	}

	.parties {
		flex: 1;
		overflow: auto;
		background: #f1f2f3;
	    padding: 20px;

		.el-party {
			transition: all .6s ease;
		}
	}

	.parties-enter {
		opacity: 0;
		transform: translateX(-30px);
	}

	.parties-leave-to {
		opacity: 0;
		transform: translateX(30px);
	}

	.parties-leave-active {
		position: absolute;
		width: 100%;
	}

	.users {
		display: flex;

		.users-list {
			display: flex;
		}

		.user {
			.tag;
			transition: all .5s ease;
			margin-right: 5px;
		}
	}

	.users-enter, .users-leave-to {
		opacity: 0;
		transform: translateY(30px);
	}

	.users-leave-active {
		position: absolute;
	}

	button {
		border: none;
		background: #2196f3;
		border-radius: 2px;
		color: #fff;
		cursor: pointer;
		padding: 10px 30px;
		outline: none;
		margin: 10px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, .12),
			0 1px 2px rgba(0, 0, 0, .24);

		transition: all .4s ease;
		max-width: 300px;

		&:hover {
			background: lighten(#2196f3, 5%);
			box-shadow: 0 1px 4px rgba(0, 0, 0, .16),
				0 2px 3px rgba(0, 0, 0, .23);
		}
	}
</style>

<script>
	import ElParty from "./ElParty.vue";

	export default {
		data() {
			return {
				waitings: [],
				loggedIn: false,
				party: undefined,
				live: true,
				search: ''
			};
		},

		computed: {
			name() {
				return this.$store.state.name;
			},

			myGame() {
				if(this.party === undefined) return {};
				const game = this.waitings.find((v) => v.id === this.party);

				if(game === undefined) return {};
				return game;
			},

			blurryParty() {
				return this.waitings.filter((v) => v.title.includes(this.search) || v.id.includes(this.search));
			}
		},

		methods: {
			use(ev) {
				const name = this.$refs.input.value;

				if(name.length < 2) {
					return alert("The name should be longer than 2 characters.");
				}

				eliminatus.socket.once('user.login.success', () => {
					this.$store.state.name = name;
				});

				eliminatus.socket.emit('user.login', name);
				ev.preventDefault();
			},

			verify(ev) {
				ev.target.value = ev.target.value.replace(/[^a-zA-Z0-9-]/g, '');
			},

			verifyNum(ev) {
				let value = parseInt(ev.target.value);
				if(value > 6) value = 6;
				if(value < 1) value = 1;
				value = Math.round(value);
				ev.target.value = `${value}`;
			},

			ping() {
				eliminatus.socket.once('match.waitings.success', waitings => {
					this.waitings = waitings;
					if(this.live) setTimeout(() => this.ping(), 100);
				});

				eliminatus.socket.emit('match.waitings');
			},

			join(id) {
				eliminatus.socket.once('match.join.success', id => {
					this.party = id;
				});

				eliminatus.socket.emit('match.join', id);
			},

			create(ev) {
				eliminatus.socket.once('match.create.success', id => {
					this.party = id;
				});

				eliminatus.socket.emit('match.create', {
					title: this.$refs.title.value,
					maxUser: parseInt(this.$refs.max.value)
				});
				ev.preventDefault();
			},

			exit() {
				eliminatus.socket.emit('match.exit');
				this.party = undefined;
			}
		},

		mounted() {
			this.live = true;
			this.ping();
		},

		destroyed() {
			this.live = false;
		},

		components: {
			ElParty
		}
	}
</script>
