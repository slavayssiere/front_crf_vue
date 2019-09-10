<template>
  <div>
    <div v-if="isAuthenticated">
        RecyclageDT
    </div>
    <div v-else>
      error RecyclageDT
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RecyclageDT',
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
