import { getField, updateField } from 'vuex-map-fields'

const state = {
  lenderData: [],
  lenderDataOps: {
    yesNo:[
      'Yes',
      'No'
    ],
    loanType:[
      'All',
      'Variable Only',
      'Fixed Only'
    ],
    repaymentOptions: [
      'Both',
      'Principal & Interest Only',
      'Interest Only'
    ]
  }

}

const mutations = {
  updateField,
  setLenderData (state, lender) {
    state.lenderData = lender;
  }
}

const actions = {

}

const getters = {
  getField,
  getLenderData (state) {
    return state.lenderData;
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
