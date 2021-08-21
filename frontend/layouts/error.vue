<template>
  <div>
    <h1 v-if="error.statusCode === 404">Votre tentative d'escapade a été reportée au Conseil Impérial.</h1>
    <h1 v-else>Votre tentative d'escapade a été reportée au Conseil Impérial.</h1>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    props: ['error'],
    layout: 'empty' // Custom layout for the error page
  })
</script>
