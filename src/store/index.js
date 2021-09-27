import Vue from 'vue'
import Vuex from 'vuex'
import add from './add'
import user from './user'
import orders from './orders'
import shared from './shared'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    add,
    user,
    shared,
    orders
  }
})
