<template>
  <section class="content">
    <h1 class="title"><span class="bracket">[</span>SALUTATIONS SPACIONAUTE<span class="bracket">]</span></h1>
    <Notification :message="error" v-if="error"/>
    <form id="login_form" method="post" @submit.prevent="login">
      <div class="field">
        <input type="email" class="input" name="email" v-model="email" />
      </div>
      <div class="field">
        <input
          type="password"
          class="input"
          name="password"
          v-model="password"
        />
      </div>
    </form>
    <button type="submit" form="login_form" class="button sf">
      ACCEDER AU COCKPIT
    </button>
  </section>
</template>

<script>
import Notification from '~/components/Notification'
import { mapGetters } from 'vuex'

export default {
  layout: "empty",
  //middleware: 'guest',
  components: {
    Notification,
  },

  data() {
    return {
      email: '',
      password: '',
      error: null,
      status: ''
    }
  },

  methods: {
    async login() {
      try {
        let user = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        }).then(response => {
          this.$auth.setUser(response.data)
        })
        this.status = "Connection successful!"
        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
        this.status = "Connection failed"
      }
    }
  },

  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  }
}
</script>

<style scoped>
  .content {
    display: grid;
    align-content: center;
    row-gap: 3rem;
    justify-items: center;
  }

  .bracket{
    font-size: 3rem;
    position:relative;
    top:0.4rem;
  }

  .title {
    min-width: 80%;
    padding: 0;
    margin: 0;
    color:white;
    transform: none;
    background: none;
    font-weight: 100;
    text-align: center;
    font-size: 1.5rem;
  }

  form {
    display: grid;
    justify-content: stretch;
    row-gap: 1.5em;
    width: 100%;
  }

  .field {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 3rem;
  }
</style>
