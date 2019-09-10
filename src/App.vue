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
            <router-link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Bénévoles
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/benevoles/list">Liste</router-link>
              <router-link class="dropdown-item" to="/benevoles/competence">Compétence</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/benevoles/non-competence">Non-Compétence</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Recyclages
            </router-link>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/recyclage/UL">UL</router-link>
              <router-link class="dropdown-item" to="/recyclage/DT">DT</router-link>
            </div>
          </li>
          <li class="nav-item dropdown">
            <router-link class="nav-link dropdown-toggle" to="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Stats
            </router-link>
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
        <div class="form-inline my-2 my-lg-0" v-else>
          <input class="form-control mr-sm-2" type="text" v-model="username" placeholder="Login" aria-label="Login">
          <input class="form-control mr-sm-2" type="password" v-model="password" placeholder="Password" aria-label="Password">
          <button class="btn btn-outline-success my-2 my-sm-0" @click="login()">Login</button>
        </div>
      </div>
    </nav>
    <router-view/>
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
      password: ''
    }
  },
  computed: mapState(['isAuthenticated']),
  methods: {
    login () {
      this.$http
        .get('/connect', {
          headers: {
            'username': this.username,
            'password': this.password
          }
        })
        .then(response => {
          let userData = response.data
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
              store.commit('setAuthenticated', true)
            })
        })
        .catch(error => {
          console.log(error)
          store.commit('setAuthenticated', false)
        })
    },
    logout () {
      store.commit('setAuthenticated', false)
    }
  },
  watch: {
    isAuthenticated (newValue, oldValue) {
      console.log(`Updating isAuthenticated from ${oldValue} to ${newValue}`)
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
