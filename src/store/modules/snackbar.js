// store/modules/snackbar.js

const state = () => ({
  visible: false,
  message: '',
  type: 'info', // success, error, warning, info
  timeout: 3000
})

const mutations = {
  SHOW_SNACKBAR(state, { message, type = 'info', timeout = 3000 }) {
    state.message = message
    state.type = type
    state.timeout = timeout
    state.visible = true
  },
  HIDE_SNACKBAR(state) {
    state.visible = false
  }
}

const actions = {
  show({ commit }, payload) {
    commit('SHOW_SNACKBAR', payload)
    setTimeout(() => {
      commit('HIDE_SNACKBAR')
    }, payload.timeout || 3000)
  }
}

const getters = {
  snackbarVisible: (state) => state.visible,
  snackbarMessage: (state) => state.message,
  snackbarType: (state) => state.type
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
