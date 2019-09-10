<template>
  <div>
    <div v-if="isAuthenticated">
        BenevolesList
    </div>
    <div v-else>
      error BenevolesList
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'BenevolesList',
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
