<template>
  <div>
    <div v-if="isAuthenticated">
        BenevolesCompetence
    </div>
    <div v-else>
      error BenevolesCompetence
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BenevolesCompetence',
  data () {
    return {
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
