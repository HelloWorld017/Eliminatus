import App from "./App.vue";
import Eliminatus from "./src/Eliminatus";
import io from "socket.io-client";
import Ripple from 'vue-ripple-directive';
import Vue from "vue";
import Vuex from "vuex";

const SERVER_URL = "localhost:2222";

window.eliminatus = {};
window.eliminatus.socket = io(SERVER_URL);

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
		followCamera: false
	}
});

new Vue({
	el: "#ui",
	render: h => h(App),
	store
});
