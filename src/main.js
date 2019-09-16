// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import { store } from './store'

async function initConfig () {
  Vue.config.productionTip = true

  await axios.get('/static/config.json')
    .then(response => {
      store.commit('setConfig', response.data)
      return store.getters.getWsPegassUrl
    })
    .catch(function (response) {
      console.log(response)
      return ''
    })

  console.log(store.getters.getWsPegassUrl)
  const base = axios.create({
    baseURL: 'http://' + store.getters.getWsPegassUrl + '/v1',
    headers: {
      common: {
        'Content-Type': 'application/json'
      }
    }
  })
  Vue.prototype.$http = base

  base.interceptors.response.use(function (response) {
    return response
  }, function (error) {
    console.log('interceptor', error, error.response.status)
    if (error.response.status === 401) {
      if (store.getters.isAuthenticated) {
        store.commit('setAuthenticated', false)
      }
      console.log('redirect')
      window.location.replace('/')
    }
  })

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

initConfig()
