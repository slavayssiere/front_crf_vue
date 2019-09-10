<template>
  <div>
    <div v-if="isAuthenticated">
        StatsMaraude
    </div>
    <div v-else>
      error StatsMaraude
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'StatsMaraude',
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
