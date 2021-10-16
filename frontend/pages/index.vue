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
      <p v-if="$fetchState.pending">Fetching posts...</p>
      <p v-else-if="$fetchState.error">Error while fetching posts</p>
      <tbody>
          <tr v-for="(galaxy, index) in galaxies" :key="index">
              <td>{{galaxy.name}}</td>
              <td>{{galaxy.prod}}</td>
              <td>{{galaxy.def}}</td>
              <td>{{galaxy.dist}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        galaxies: []
    };
  },
  /*async fetch() {
    alert("Before")
    galaxies = await fetch(
      'https://freespot.ch/fakeAPI.php?api=GetVisiblePlanets'
    ).then(res => res.json())
    /*const { data } = await axios.get(
      'https://freespot.ch/fakeAPI.php?api=GetVisiblePlanets'
    )
    alert("After")
  },*/
  /*async asyncData([ $axios ]) {
    alert("Before")
    const galaxies = await $axios.$post('/fakeAPI', {api:"GetVisiblePlanets"})
    alert("After")
    return { galaxies }
  }*/
};
</script>