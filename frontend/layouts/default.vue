<template>
    <div>
        <TheNavBar/>
        <Nuxt />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheNavBar from '../components/TheNavbar.vue'

export default Vue.extend({
  components: { TheNavBar },})
</script>