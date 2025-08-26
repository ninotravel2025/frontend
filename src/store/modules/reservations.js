import { getTokenFromLocalStorage } from "@/utils/token"
import axios from "axios"


// store/modules/snackbar.js
const state = () => ({})
const mutations = {}

// REST API ENDPOINT
const NINO_BACKEND_BASE_URL= import.meta.env.VITE_NINO_BACKEND_API

const actions = {
  async reserveExcursion({ commit, dispatch }, {data}) {
    const token = getTokenFromLocalStorage()
    try {
        await axios.post(`${NINO_BACKEND_BASE_URL}/reservations/excursions`, data, {headers: {Authorization: `Bearer ${token}`}})
        
        // ✅ Show success snackbar
        dispatch(
          'snackbar/show',
          { message: "Réservation d'excursion réussie !", type: 'success' },
          { root: true }
        )
        return true
    } catch (error) {
        console.error(error)
        
        // ✅ Show error snackbar
        dispatch(
          'snackbar/show',
          { message: 'Échec de la réservation', type: 'error' },
          { root: true }
        )

        return false
    }
  },
  async reserveVehicule({ commit, dispatch }, {data}) {
    const token = getTokenFromLocalStorage()
     try {
        await axios.post(`${NINO_BACKEND_BASE_URL}/reservations/vehicules`, data, {headers: {Authorization: `Bearer ${token}`}})
        
        // ✅ Show success snackbar
        dispatch(
          'snackbar/show',
          { message: 'Réservation de véhicule réussie !', type: 'success' },
          { root: true }
        )
        return true
    } catch (error) {
        console.error(error)
        
        // ✅ Show error snackbar
        dispatch(
          'snackbar/show',
          { message: 'Échec de la réservation', type: 'error' },
          { root: true }
        )

        return false
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
