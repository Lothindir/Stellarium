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
      <p v-else-if="$fetchState.error">
        Impossible de scanner la planète actuellement
      </p>
      <p v-else>
        Carburant: {{ this.ship.carb.curr }}/{{ this.ship.carb.max }}
      </p>
      <tbody>
        <tr v-for="(planet, index) in this.galaxies" :key="index" class="planet" @click="coucou(planet)">
          <td>{{ planet.name }}</td>
          <td>{{ planet.production.metal }} {{ planet.production.energy }} {{ planet.production.biomass }} {{ planet.production.water }}</td>
          <td>{{ planet.defenseLevel }}</td>
          <td>{{ planet.distance }}</td>
          <!-- <td v-if="planet.dist<400"><button @click="move(planet.dist)">Explorer</button></td> -->
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
      ship: [],
    }
  },
  methods: {
    coucou(planet){
      console.log(planet.name)
      this.$router.push({
        name: 'planet',
        params: {id : 3, name: planet.name}
      })
    },
    async move(planetID) {
      const move = await fetch('/api/fakeAPI?api=Move&planetID=' + planetID)
        .then((res) => res.json())
        .then((data) => data.move)
      if (move.actionSuccessful) {
        alert('Vous vous êtes déplacés sur la planète ', planetID)
      } else if (move.outcome == "fuel") {
          alert("Vous n'avez pas assez de carburant pour effectuer le déplacement.")
      } else {
        alert("Vous n'avez pas pu effectuer le déplacement pour une drôle de raison...")
      }
    },
  },
  async fetch() { // Fetch when loading page
    this.galaxies = await fetch('/api/fakeAPI?api=GetVisiblePlanetsNew')
      .then((res) => res.json())
      .then((data) => data.galaxies)
    this.ship = await fetch('/api/fakeAPI?api=GetShip')
      .then((res) => res.json())
      .then((data) => data.ship)
  },
}
</script>

<style>
  .planet{
    border-bottom: white solid 1px;
  }
</style>