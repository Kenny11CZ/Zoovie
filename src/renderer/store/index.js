import Vue from 'vue'
import Vuex from 'vuex'

// import modules from './modules'
import movies from './modules/Movies';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: [
        movies
    ],
    // plugins
  // modules,
  strict: process.env.NODE_ENV !== 'production'
})
