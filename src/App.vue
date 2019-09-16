<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/" class="navbar-brand">UL-Management</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto" v-if="isAuthenticated">
          <li class="nav-item dropdown">
            <div class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bénévoles
            </div>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/benevoles/list">Liste</router-link>
              <router-link class="dropdown-item" to="/benevoles/competence">Compétence</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/benevoles/non-competence">Non-Compétence</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/benevoles/tc">Tronc Commun</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <div class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Recyclages
            </div>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/recyclage/UL">UL</router-link>
              <router-link class="dropdown-item" to="/recyclage/DT">DT</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <div class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Stats
            </div>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/stats/formation">Formation</router-link>
              <router-link class="dropdown-item" to="/stats/maraude">Maraude</router-link>
              <router-link class="dropdown-item" to="/stats/fc">FC PSE</router-link>
              <router-link class="dropdown-item" to="/stats/missionlocal">Mission locale</router-link>
              <router-link class="dropdown-item" to="/stats/reseau">Réseau</router-link>
            </div>
          </li>
        </ul>
        <div class="navbar-text" v-if="isAuthenticated">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="logout()">Logout</button>
        </div>
        <div class="form-inline my-2 my-lg-0" v-else-if="isLoading">
          Connecting...
        </div>
        <div class="form-inline my-2 my-lg-0" v-else>
          <input class="form-control mr-sm-2" type="text" v-model="username" placeholder="Login" aria-label="Login">
          <input class="form-control mr-sm-2" type="password" v-model="password" placeholder="Password" aria-label="Password">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="login()">Login</button>
        </div>
      </div>
    </nav>
    <div class="container">
      <div class="row">
        <div class="col-sm-1"></div>
        <router-view class="col-sm-8"/>
        <div class="col-sm-1"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from './store'
export default {
  name: 'App',
  data () {
    return {
      username: '',
      password: '',
      isLoading: false
    }
  },
  computed: mapState(['isAuthenticated']),
  methods: {
    login () {
      this.isLoading = true
      this.$http
        .get('/connect', {
          headers: {
            'username': this.username,
            'password': this.password
          }
        })
        .then(response => {
          store.commit('setAuthenticated', true)
          let userData = response.data
          this.setHeaders(userData, true)
          this.$http
            .get('/benevoles/address/' + userData.utilisateur.gaia_id)
            .then(response => {
              userData.utilisateur.address = response.data.adresseLine1 + ' ' + response.data.adresseLine2
              userData.utilisateur.persContact = response.data.persContPrin
            })
            .catch(error => {
              console.log('error', error)
            })
            .finally(() => {
              store.commit('setUserData', userData)
            })
          this.$http
            .get('/competences')
            .then(response => {
              store.commit('setCompetences', response.data)
            })
            .catch(error => {
              console.log('error', error)
            })
        })
        .catch(error => {
          console.log(error)
          store.commit('setAuthenticated', false)
        })
    },
    logout () {
      store.commit('setAuthenticated', false)
    },
    setHeaders: function (userData, isAuthenticated) {
      if (store.getters.isAuthenticated) {
        this.$http.defaults.headers.common['F5-ST'] = userData.F5_ST
        this.$http.defaults.headers.common['LastMRH-Session'] = userData.LastMRH_Session
        this.$http.defaults.headers.common['MRHSession'] = userData.MRHSession
        this.$http.defaults.headers.common['SAML'] = userData.SAML
        this.$http.defaults.headers.common['JSESSIONID'] = userData.JSESSIONID
        this.$http.defaults.headers.common['shibsession_name'] = userData.SHIBSession.name
        this.$http.defaults.headers.common['shibsession_value'] = userData.SHIBSession.value
      } else {
        delete this.$http.defaults.headers.common['F5-ST']
        delete this.$http.defaults.headers.common['LastMRH-Session']
        delete this.$http.defaults.headers.common['MRHSession']
        delete this.$http.defaults.headers.common['SAML']
        delete this.$http.defaults.headers.common['JSESSIONID']
        delete this.$http.defaults.headers.common['shibsession_name']
        delete this.$http.defaults.headers.common['shibsession_value']
      }
    }
  },
  watch: {
    isAuthenticated (newValue, oldValue) {
      console.log(`Updating isAuthenticated from ${oldValue} to ${newValue}`)
      this.isLoading = false
      this.setHeaders(store.getters.getUserData, newValue)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
