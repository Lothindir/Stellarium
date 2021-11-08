<template>
  <div>
    <h1>Liste des Federations</h1>
    <b-table
      hover
      :items="federations"
    />
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';

const axios = require('axios');

export default {
  components: {
    BTable,
  },
  data() {
    return {
      federations: [],
    };
  },
  created() {
    axios.get;
  },
};
</script>

<style>
</style>
