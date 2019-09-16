<template>
  <div>
    <div v-if="isAuthenticated">
      <select class="form-control" v-model="formSelected">
        <option selected="true">none</option>
        <option v-for="form in store.getters.getFormation" v-bind:key="form.id" v-bind:value="form.id">
          {{ form.libelle }}
        </option>
      </select>
      <table class="table table-sm" v-if="formSelected !== null && formSelected !==  'none'">
        <thead>
          <tr>
            <th scope="col">Nivol</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Portable</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ben in benevoles" v-bind:key="ben.id">
            <th scope="row">{{ ben.nivol }}</th>
            <td>{{ ben.prenom }}</td>
            <td>{{ ben.nom }}</td>
            <td>{{ ben.email }}</td>
            <td>{{ ben.portable }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      error BenevolesNonCompetence
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from '../store'
export default {
  name: 'BenevolesNonCompetence',
  data () {
    return {
      store: store,
      formSelected: null,
      benevoles: []
    }
  },
  methods: {
    getBenevolesForm: function (idForm) {
      this.$http
        .get('/competences/FORM/' + idForm + '/no?ul=' + store.getters.getUtilisateur.structure.id + '&page=0')
        .then(response => {
          this.getEmails(response.data.list)
          for (let page = 1; page !== response.data.pages; page++) {
            this.$http
              .get('/competences/FORM/' + idForm + '/no?ul=' + store.getters.getUtilisateur.structure.id + '&page=' + page)
              .then(response => {
                this.getEmails(response.data.list)
              })
              .catch(error => {
                console.log('in getBenevolesForm first looop', error)
              })
          }
        })
        .catch(error => {
          console.log('in getBenevolesForm second looop', error)
        })
    },
    getEmails: function (list) {
      this.$http
        .post('/benevoles/emails', {
          list: list
        })
        .then(response => {
          for (var i = 0; i !== response.data.list.length; i++) {
            for (var j = 0; j !== list.length; j++) {
              if (response.data.list[i].nivol === list[j].nivol) {
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
    },
    formSelected (newValue) {
      this.benevoles = []
      console.log('change for', newValue)
      this.getBenevolesForm(newValue)
    }
  }
}
</script>
