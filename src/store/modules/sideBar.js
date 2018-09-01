
const state = {
  drawer: true
}

const mutations = {
  toggleSideBar (state) {
    state.drawer = !state.drawer;
  }
}

const actions = {
  toggleSideBar (context) {
    context.commit('toggleSideBar');
  }
}

const getters = {
  getDrawerState (state) {
    return state.drawer;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
