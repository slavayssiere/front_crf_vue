<template>
  <div>
    <div v-if="isAuthenticated">
        BenevolesNonCompetence
    </div>
    <div v-else>
      error BenevolesNonCompetence
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BenevolesNonCompetence',
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
