<template>
  <div>
    <div v-if="isAuthenticated">
      <table class="table table-sm">
        <thead>
          <tr>
            <th scope="col">Nivol</th>
            <th scope="col">Prenom</th>
            <th scope="col">Nom</th>
            <th scope="col">Email</th>
            <th scope="col">Portable</th>
            <th scope="col">CRB</th>
            <th scope="col">PSC</th>
            <th scope="col">TCAS</th>
            <th scope="col">TCAU</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ben in benevoles" v-bind:key="ben.id">
            <th scope="row">{{ ben.nivol }}</th>
            <td>{{ ben.prenom }}</td>
            <td>{{ ben.nom }}</td>
            <td>{{ ben.email }}</td>
            <td>{{ ben.portable }}</td>
            <td v-bind:class="[ben.CRB ? 'p-3 mb-2 bg-success text-white': 'p-3 mb-2 bg-warning text-white']">{{ ben.CRB }}</td>
            <td v-bind:class="[ben.PSC ? 'p-3 mb-2 bg-success text-white': 'p-3 mb-2 bg-danger text-white']">{{ ben.PSC }}</td>
            <td v-bind:class="[ben.TCAS ? 'p-3 mb-2 bg-success text-white': 'p-3 mb-2 bg-warning text-white']">{{ ben.TCAS }}</td>
            <td v-bind:class="[ben.TCAU ? 'p-3 mb-2 bg-success text-white': 'p-3 mb-2 bg-warning text-white']">{{ ben.TCAU }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>error BenevolesTC</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from '../store'
export default {
  name: 'BenevolesTC',
  data () {
    return {
      benevoles: []
    }
  },
  mounted () {
    this.$http
      .get('/competences/tc?ul=' + store.getters.getUtilisateur.structure.id + '&page=0')
      .then(response => {
        this.getEmails(response.data.list)
        for (let page = 1; page !== response.data.pages; page++) {
          this.$http
            .get('/competences/tc?ul=' + store.getters.getUtilisateur.structure.id + '&page=' + page)
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
          console.log(list)
          this.benevoles = this.benevoles.concat(list)
        })
        .catch(error => {
          console.log(error)
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
