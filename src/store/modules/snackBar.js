
const state = {
  message: 'Default Message',
  show: false,
  timeout: 4000,
  color: "success"
}

const mutations = {
  snack(state, payload) {
    state.show = true;
    state.color = payload.color;
    state.message = payload.message;
    setTimeout(function(){
      state.show = false;
    }, state.timeout)
  },
  hideSnack(state) {
    state.show = false;
  }
}

const actions = {
  hideSnack (context) {
    context.commit('hideSnack')
  }
}

const getters = {
  getSnackMessage (state) {
    return state.message;
  },
  getSnackShow (state) {
    return state.show;
  },
  getSnackTimeout(state) {
    return state.timeout;
  },
  getSnackColor(state) {
    return state.color;
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
