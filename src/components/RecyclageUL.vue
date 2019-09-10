<template>
  <div>
    <div v-if="isAuthenticated">
        RecyclageUL
    </div>
    <div v-else>
      error RecyclageUL
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'RecyclageUL',
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
