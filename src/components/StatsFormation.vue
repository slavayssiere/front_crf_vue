<template>
  <div>
    <div v-if="isAuthenticated">
        StatsFormation
    </div>
    <div v-else>
      error StatsFormation
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsFormation',
  data () {
    return {}
  },
  computed: mapState(['isAuthenticated']),
  watch: {
    isAuthenticated (newValue, oldValue) {
      console.log('authent old/new', oldValue, newValue)
    }
  }
}
</script>
