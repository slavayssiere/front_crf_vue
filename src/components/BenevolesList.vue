<template>
  <div>
    <div v-if="isAuthenticated">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Nivol</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Accepte Email</th>
            <th scope="col">Autorisé Ext</th>
            <th scope="col">Email</th>
            <th scope="col">Portable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ben in benevoles" v-bind:key="ben.id">
            <th scope="row">{{ ben.id }}</th>
            <td>{{ ben.prenom }}</td>
            <td>{{ ben.nom }}</td>
            <td>{{ ben.allow_email }}</td>
            <td>{{ ben.allow_external }}</td>
            <td>{{ ben.email }}</td>
            <td>{{ ben.portable }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>error BenevolesList</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from '../store'
export default {
  name: 'BenevolesList',
  data () {
    return {
      benevoles: []
    }
  },
  mounted () {
    this.$http
      .get('/benevoles/all?ul=' + store.getters.getUtilisateur.structure.id + '&page=0')
      .then(response => {
        this.getEmails(response.data.list)
        for (let page = 1; page !== response.data.pages; page++) {
          this.$http
            .get('/benevoles/all?ul=' + store.getters.getUtilisateur.structure.id + '&page=' + page)
            .then(response => {
              this.getEmails(response.data.list)
            })
            .catch(error => {
              console.log('in BenevoleList second looop', error)
            })
        }
      })
      .catch(error => {
        console.log('in BenevoleList first looop', error)
      })
  },
  methods: {
    getEmails: function (list) {
      this.$http
        .post('/benevoles/emails', {
          list: list
        })
        .then(response => {
          for (var i = 0; i !== response.data.list.length; i++) {
            for (var j = 0; j !== list.length; j++) {
              if (response.data.list[i].nivol === list[j].id) {
                list[j].email = response.data.list[i].email
                list[j].portable = response.data.list[i].portable
              }
            }
          }
          this.benevoles = this.benevoles.concat(list)
        })
    }
  },
  computed: mapState(['isAuthenticated']),
  watch: {
    isAuthenticated (newValue, oldValue) {
      console.log('authent old/new', oldValue, newValue)
    }
  }
}
</script>
