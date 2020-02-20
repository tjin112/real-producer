import Vue from "vue";
import Vuex from "vuex";
import Identity from "./identity";
import Search from "./search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { Identity, Search }
});
