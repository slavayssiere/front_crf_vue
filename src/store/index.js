import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
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
    isAuthenticated: false
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
      if (state.isAuthenticated) {
        axios.defaults.headers.common['F5-ST'] = state.user_data.F5_ST
        axios.defaults.headers.common['LastMRH-Session'] = state.user_data.LastMRH_Session
        axios.defaults.headers.common['MRHSession'] = state.user_data.MRHSession
        axios.defaults.headers.common['SAML'] = state.user_data.SAML
        axios.defaults.headers.common['JSESSIONID'] = state.user_data.JSESSIONID
        axios.defaults.headers.common['shibsession_name'] = state.user_data.SHIBSession.name
        axios.defaults.headers.common['shibsession_value'] = state.user_data.SHIBSession.value
      } else {
        delete axios.defaults.headers.common['F5-ST']
        delete axios.defaults.headers.common['LastMRH-Session']
        delete axios.defaults.headers.common['MRHSession']
        delete axios.defaults.headers.common['SAML']
        delete axios.defaults.headers.common['JSESSIONID']
        delete axios.defaults.headers.common['shibsession_name']
        delete axios.defaults.headers.common['shibsession_value']
      }
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
    }
  },
  plugins: [vuexLocal.plugin]
})
