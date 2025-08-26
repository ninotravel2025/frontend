import axios from "axios"
import { getTokenFromLocalStorage, getUserFromLocalStorage, setTokenInLocalStorage, setUserInLocalStorage } from "@/utils/token"

const state = () => ({
    user: null,
    token: null,
    isAuthenticated: false
})

// REST API ENDPOINT
const NINO_BACKEND_BASE_URL= import.meta.env.VITE_NINO_BACKEND_API

const mutations = {
  SET_USER(state, user) {
    state.user = user
    state.isAuthenticated = !!user
    setUserInLocalStorage(user)
  },
  SET_TOKEN(state, token) {
    state.token = token
    setTokenInLocalStorage(token)
  },
  LOGOUT(state) {
    state.isAuthenticated = false
  }
}

const actions = {
  async login({ commit, dispatch}, { data }) {
    try {
        const response = await axios.post(`${NINO_BACKEND_BASE_URL}/auth/login`, data)
        const {user, token} = response.data.data
        commit('SET_USER', user)
        commit('SET_TOKEN', token)
        
        // ✅ Show success snackbar
        dispatch(
          'snackbar/show',
          { message: 'Connexion réussie !', type: 'success' },
          { root: true }
        )
        return true
    } catch (error) {
        console.error(error)
        
        // ✅ Show error snackbar
        dispatch(
          'snackbar/show',
          { message: 'Échec de la connexion', type: 'error' },
          { root: true }
        )

        return false
    }
  },
  async register({ commit, dispatch }, { data }) {
    try {
      await axios.post(`${NINO_BACKEND_BASE_URL}/auth/register`, data)
      dispatch(
        'snackbar/show',
        { message: 'Compte créé avec succès !', type: 'success' },
        { root: true }
      )
      return true
    } catch (error) {
      console.error(error)
      let errorMsg = 'Échec de la création du compte';
      if (error?.response?.data?.error) {
        if (error.response.data.error.includes('duplicate key') && error.response.data.error.includes('phone')) {
          errorMsg = "Ce numéro de téléphone est déjà utilisé.";
        } else if (error.response.data.error.includes('duplicate key') && error.response.data.error.includes('email')) {
          errorMsg = "Cet email est déjà utilisé.";
        } else {
          errorMsg = error.response.data.error;
        }
      }
      dispatch(
        'snackbar/show',
        { message: errorMsg, type: 'error' },
        { root: true }
      )
      return false
    }
  },
  async init({ commit }) {
    const token = getTokenFromLocalStorage();
    const user = getUserFromLocalStorage();
    if (token && user) {
      commit('SET_TOKEN', token)
      commit('SET_USER', user)
    } else {
      commit('SET_TOKEN', null)
      commit('SET_USER', null)
    }
  },
  logout({ commit }) {
    commit('SET_USER', null)
    commit('SET_TOKEN', null)
    commit('LOGOUT')
  }
}

const getters = {
  isAuthenticated: (state) => state.isAuthenticated,
  getUser: (state) => state.user,
  getToken: (state) => state.token
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}