import "./css/index.css";

import App from "./App.vue";
import Eliminatus from "./src/Eliminatus";
import IngredientUI from "./components/ElIngredients.vue";
import io from "socket.io-client";
import Ripple from 'vue-ripple-directive';
import Vue from "vue";
import Vuex from "vuex";

const SERVER_URL = "localhost:2222";

window.eliminatus = {};

eliminatus.socket = io(SERVER_URL);

Vue.use(Vuex);
Vue.directive('ripple', Ripple);

const store = new Vuex.Store({
	state: {
		ingame: false,
		name: undefined,
		health: 10,
		maxHealth: 10,
		buildMode: false,
		buildingObject: undefined,
		inventory: {},
		ingredients: [],
		buildInavailReasons: [],
		followCamera: false
	}
});

new Vue({
	el: "#ui",
	render: h => h(App),
	store
});

new Vue({
	el: "#ingredients",
	render: h => h(IngredientUI),
	store
});

//ONLY FOR TEST
const freepass = async () => {
	const awaitPacket = (tag, payload) => new Promise((resolve, reject) => {
		eliminatus.socket.once(`${tag}.success`, resolve);
		eliminatus.socket.emit(tag, payload);
	});

	await awaitPacket('user.login', "Khinenw");
	await awaitPacket('match.create', {
		title: 'TestGame',
		maxUser: 1
	});
};

if(location.href.endsWith('freepass')) freepass();

eliminatus.socket.on('game.start', ({id, uid}) => {
	store.state.ingame = id;

	eliminatus.socket.once('world.generation', async settings => {
		eliminatus.game = new Eliminatus(store, settings);
		await eliminatus.game.init(uid);
	});
});
