import Vuex from 'vuex'
import Vue from 'vue'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'ul-management-front'
})

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    user_data: {},
    config: null,
    isAuthenticated: false,
    competences: [],
    nominations: [],
    formations: []
  },
  mutations: {
    setUserData (state, data) {
      console.log('store - setUserData', data)
      state.user_data = data
    },
    setConfig (state, data) {
      console.log('store - setConfig', data)
      state.config = data
    },
    setAuthenticated (state, data) {
      state.isAuthenticated = data
    },
    setCompetences (state, data) {
      state.competences = data.competences
      state.nominations = data.nominations
      state.formations = data.formations
    }
  },
  actions: {
  },
  getters: {
    isAuthenticated: state => {
      return state.isAuthenticated
    },
    getWsPegassUrl: state => {
      if (state.config === null) {
        return null
      } else {
        return state.config.ws_pegass_url
      }
    },
    getBaseUrl: state => {
      if (state.config === null) {
        return null
      } else {
        return state.config.base_url
      }
    },
    getName: state => {
      if (state.user_data === null) {
        return ''
      }
      return state.user_data.utilisateur.prenom + ' ' + state.user_data.utilisateur.nom
    },
    getNivol: state => {
      if (state.user_data === null) {
        return ''
      }
      return state.user_data.utilisateur.id
    },
    getGaiaId: state => {
      if (state.user_data === null) {
        return ''
      }
      return state.user_data.utilisateur.gaia_id
    },
    getStructures: state => {
      if (state.user_data === null) {
        return ''
      }
      return state.user_data.structuresAdministrees
    },
    getUtilisateur: state => {
      if (state.user_data === null) {
        return ''
      }
      return state.user_data.utilisateur
    },
    getUserData: state => {
      return state.user_data
    },
    getFormation: state => {
      return state.formations
    }
  },
  plugins: [vuexLocal.plugin]
})
