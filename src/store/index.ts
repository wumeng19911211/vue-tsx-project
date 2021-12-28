import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import helloworld from './helloworld';
export default new Vuex.Store({
  state: {
    projectName: '汪汪汪',
    version: '1.1.0'
  },
  mutations: {
    changeProjectName(state) { 
      state.projectName = '人人人'
    }
  },
  actions: {
  },
  modules: {
    helloworld
  },
});
