<template>
<div>
  <h1>[Login page content]</h1>
  <div v-if="isAuthenticated">
    <h1>Connected</h1>
  </div>
  <div v-else>
    <h1>Not connected</h1>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>