<template>
  <div class="content">
    <h3>ERREUR !</h3>
    <p v-if="error.statusCode === 404">Votre tentative d'escapade a été reportée au Conseil Impérial.</p>
    <p v-else>Une erreur s'est produite et a été reportée au Conseil Impérial.</p>
    <NuxtLink tag="button" class="sf" to="/">retourner au cockpit</NuxtLink>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: ['error'],
    layout: 'empty'
  })
</script>
