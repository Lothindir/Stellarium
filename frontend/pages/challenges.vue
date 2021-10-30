<template>
  <section class="content">
    <h2>Validation des défis</h2>
    <Notification :message="error" v-if="error" />
    <form id="trial_form" method="post" @submit.prevent="ValidateTrial">
      <div class="field">
        <input
          type="number"
          class="input"
          name="trialNumber"
          placeholder="1"
          v-model="trialNumber"
        />
      </div>
      <div class="field">
        <input
          type="text"
          class="input"
          name="trialResponse"
          placeholder="EA253E"
          v-model="trialResponse"
        />
      </div>
    </form>
    <button
      type="submit"
      form="trial_form"
      class="button is-dark is-fullwidth"
    >
      VALIDER
    </button>
  </section>
</template>

<script>
export default {
  data() {
    return {
      trialNumber: '1',
      trialResponse: 'B31EA3',
      error: ''
    }
  },
  methods: {
    // Called instead of the submit
    async ValidateTrial() {
      const trialValidation = await this.$axios
        .get('/trial/?chall=' + this.trialNumber + '&qr=' + this.trialResponse)
        .then((res) => res.data.trialValidation)
      console.log(trialValidation)
      if (trialValidation.actionSuccessful) {
        var message = 'Défi validé !\nSe déplacer gratuitement vers la ' + trialValidation.planet.type.toLowerCase() + ' en ' + trialValidation.planet.coordinates[0] + ', ' + trialValidation.planet.coordinates[1] + ' ?\n(Position actuelle : ??)\n'
        if (trialValidation.planet.type === 'Planète') {
          // Add information on planet
          message += 'Type de planète : ' + trialValidation.planet.planetType + '\n'
          if (trialValidation.planet.colony) {
            message += 'Propriétaire : ' + trialValidation.planet.colony.owner
          } else {
            message += 'Actuellement inabitée'
          }
        } else {
          // Add information on other stallar objects
          message += "Ressources à récupérer :\n"
          message += 'Eau : ' + trialValidation.planet.resources.water + '\n'
          message += 'Métal : ' + trialValidation.planet.resources.metal + '\n'
          message += 'Energie : ' + trialValidation.planet.resources.energy + '\n'
          message += 'Biomasse : ' + trialValidation.planet.resources.biomass
        }
        if (window.confirm(message)) {
          const move = await this.$axios
            .get('/fakeAPI?api=FreeMove&planetID=' + trialValidation.planet.id)
            .then((res) => res.data)
          if (move.actionSuccessful) {
            alert("Merci de ne pas essayer de tricher.\nLa conséquence est une expulsion du jeu immédiate.")
            this.$router.push('/logout')
          } else {
            this.$router.push('/')
          }
        } else {
          // Empty fields
          this.trialNumber = ''
          this.trialResponse = ''
          alert('Vous ne vous êtes pas déplacés.')
        }
      } else {
        alert('N\'essaie pas des trucs au hasard !')
      }
    },
  },
}
</script>
