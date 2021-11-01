<template>
  <div class="content">
    <h1>[Contenu de la page défis]</h1>
    <div v-if="isAuthenticated">
      <h1>Connected</h1>
      <p>{{loggedInUser.username}} or {{loggedInUsername}} or {{username}} is {{isAuthenticated}}</p>
      <form method="post" @submit.prevent="logout">
        <button type="submit" class="button is-dark is-fullwidth">Log Out</button>
      </form>
    </div>
    <div v-else>
      <h1>Not connected</h1>
      <p>{{username}}</p>
      <p>{{isAuthenticated}}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      username: this.$auth.user.username
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser', 'loggedInUsername'])
  },
  //middleware: 'auth',
    methods: {
    async logout() {
      alert(JSON.stringify(this.$auth.user, null, 4))
      await this.$auth.logout();  // this method will logout the user and make token to false on the local storage of the user browser
    }
  }
}
</script>