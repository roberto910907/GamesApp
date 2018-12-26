import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import GameList from './modules/games-list';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    GameList,
  },
});
