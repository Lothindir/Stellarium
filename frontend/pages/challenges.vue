<template>
  <section class="content">
    <h2>VALIDATION DES DÉFIS</h2>
    <Notification :message="error" v-if="error" />
    <form id="challenge_form" method="post" @submit.prevent="ValidateChallenge">
      <div class="field">
        <input
          type="number"
          class="input"
          name="challengeNumber"
          placeholder="1"
          v-model="challengeNumber"
        />
      </div>
      <div class="field">
        <input
          type="text"
          class="input"
          name="challengeResponse"
          placeholder="EA253E"
          v-model="challengeResponse"
        />
      </div>
    </form>
    <button
      type="submit"
      form="challenge_form"
      class="button is-dark is-fullwidth"
    >
      VALIDER
    </button>
  </section>
</template>

<script>
export default {
  methods: {
    // Called instead of the submit
    async ValidateChallenge() {
      const challengeValidation = await this.$axios
        .post('/fakeAPI', { api: 'ValidateChallenge', challengeNumber: this.challengeNumber, challengeResponse: this.challengeResponse })
        .then((res) => res.data.challengeValidation)
      console.log(challengeValidation)
      if (challengeValidation.actionSuccessful) {
        alert('Défi validé !')
      } else {
        alert('N\'essaie pas des trucs au hasard !')
      }
    },
  },
}
</script>
