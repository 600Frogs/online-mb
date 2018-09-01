import Vue from 'vue'
import Vuex from 'vuex'
import snackBar from './modules/snackBar'
import sideBar from './modules/sideBar'
import userData from './modules/userData'
import lenderData from './modules/lenderData'

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    snackBar,
    sideBar,
    userData,
    lenderData
  },
  state: {
    authenticated: false,
  }

});
