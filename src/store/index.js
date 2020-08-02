import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  token:'',
  },
  mutations: {
	  setToken:function(state,option){
		  this.state.token=option;
		  console.log(this.state.token)
	  }
  },
  actions: {
  },
  modules: {
  }
})
