<template>
  <div>
    <div v-if="isAuthenticated">
        StatsFC
    </div>
    <div v-else>
      error StatsFC
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsFC',
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
