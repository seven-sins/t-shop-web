import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nav: ""
  },
  getters: {
    getNav: state => state.nav
  },
  mutations: {
    setNav(state, nav){
      state.nav = nav;
    }
  },
  actions: {
 
  },
  modules: {
    
  }
});
