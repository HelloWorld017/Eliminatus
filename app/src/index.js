import Eliminatus from "./Eliminatus";
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

window.game = new Eliminatus();
window.game.init();
