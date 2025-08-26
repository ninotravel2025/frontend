import { createStore } from 'vuex'
import auth from './modules/auth'
import snackbar from './modules/snackbar'
import reservations from './modules/reservations'

// Create a new store instance.
const store = createStore({
  modules: {
    auth,
    snackbar,
    reservations
  }
})

export default store