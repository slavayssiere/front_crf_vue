<template>
  <div class="hello">
    <div v-if="isAuthenticated">
      <h1>Bienvenue, {{ getName }}</h1>
      <h2>Nivol: {{ getNivol }}</h2>
      <p v-for="structure in getStructures" v-bind:key="structure.id">
        Structure administrable: {{ structure.libelle}} ({{ structure.id}})
      </p>
      <p v-if="getUtilisateur.address">
        Adresse: {{ getUtilisateur.address }}
      </p>
      <p v-if="getUtilisateur.persContact">
        En cas d'accident: {{ getUtilisateur.persContact }}
      </p>
    </div>
    <div v-else>
      <h1>Bienvenue sur UL-Management</h1>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { store } from '../store'
export default {
  name: 'Main',
  data () {
    return {
      getName: store.getters.getName,
      getStructures: store.getters.getStructures,
      getUtilisateur: store.getters.getUtilisateur,
      getNivol: store.getters.getNivol
    }
  },
  computed: mapState(['isAuthenticated']),
  watch: {
    isAuthenticated (newValue, oldValue) {
      console.log('authent old/new', oldValue, newValue)
      this.getName = store.getters.getName
      this.getNivol = store.getters.getNivol
      this.getStructures = store.getters.getStructures
      this.getUtilisateur = store.getters.getUtilisateur
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
