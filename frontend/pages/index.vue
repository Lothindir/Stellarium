<template>
  <div class="content">
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Propriétaire</th>
          <th>Production</th>
          <th>Défense</th>
          <th>Distance</th>
        </tr>
      </thead>
      <p v-if="$fetchState.pending">Recherche des planètes...</p>
      <p v-else-if="$fetchState.error">Impossible de scanner la planète actuellement</p>
      <tbody>
        <tr v-for="(galaxy, index) in this.galaxies" :key="index">
          <td>{{ galaxy.name }}</td>
          <td>{{ galaxy.prod }}</td>
          <td>{{ galaxy.def }}</td>
          <td>{{ galaxy.dist }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      galaxies: [],
    }
  },
  async fetch() {
    this.galaxies = await fetch('/api/fakeAPI?api=GetVisiblePlanets')
      .then((res) => res.json())
      .then((data) => data.galaxies)
    //alert("After")
  }
}
</script>