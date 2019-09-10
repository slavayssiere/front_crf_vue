<template>
  <div>
    <div v-if="isAuthenticated">
        StatsML
    </div>
    <div v-else>
      error StatsML
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsML',
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
