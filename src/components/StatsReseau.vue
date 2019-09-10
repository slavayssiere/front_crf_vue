<template>
  <div>
    <div v-if="isAuthenticated">
        StatsReseau
    </div>
    <div v-else>
      error StatsReseau
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsReseau',
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
