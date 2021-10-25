<template>
  <div class="content">
    <h1>Planètes</h1>
    <h2>Planètes visibles</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Propriétaire</th>
          <th class="defense">Défense</th>
          <th class="distance">Distance</th>
        </tr>
      </thead>
      <p v-if="$fetchState.pending">Recherche des planètes...</p>
      <p v-else-if="$fetchState.error">
        Impossible de scanner la planète actuellement
      </p>
      <tbody>
        <tr v-for="(planet, index) in this.planets" :key="index" class="planet" @click="inspect(planet)">
          <td class="name">{{ planet.name }}</td>
          <td class="defense">{{ planet.defenseLevel }} ({{(ship.pa/(parseInt(planet.defenseLevel)+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-if="planet.distance<400" class="distance accessible">{{ planet.distance }}</td>
          <td v-else class="distance inaccessible">{{ planet.distance }}</td>
          <!-- <td v-if="planet.dist<400"><button @click="move(planet.dist)">Explorer</button></td> -->
        </tr>
      </tbody>
    </table>
    <h2>Planètes alliées</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Propriétaire</th>
          <th class="defense">Défense</th>
          <th class="distance">Distance</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planet, index) in this.alliedPlanets" :key="index" class="planet" @click="inspect(planet)">
          <td class="name">{{ planet.name }}</td>
          <td class="defense">{{ planet.defenseLevel }} ({{(ship.pa/(parseInt(planet.defenseLevel)+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-if="planet.distance<400" class="distance accessible">{{ planet.distance }}</td>
          <td v-else class="distance inaccessible">{{ planet.distance }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      planets: [],
      ship: [],
    }
  },
  computed: {
    alliedPlanets: function () {
      return this.planets.filter(planet => planet.isAlly)
    }
  },
  methods: {
    inspect(planet){
      this.$router.push({
        name: 'planet',
        params: {id : planet.id, name: planet.name}
      })
    },
  },
  async fetch() { // Fetch when loading page
    this.planets = await fetch('/api/fakeAPI?api=GetVisiblePlanetsNew')
      .then((res) => res.json())
      .then((data) => data.planets)
    this.ship = await fetch('/api/fakeAPI?api=GetShip')
      .then((res) => res.json())
      .then((data) => data.ship)
  },
}
</script>

<style>

  table{
    border-collapse: separate;
    border-spacing: 3px;
    margin-bottom: 1rem;
  }

  thead{
    height: 2.5rem;
    background: none;
  }

  th, td{
    padding: 0.3rem;
  }

  .planet{
    height: 2.5rem;
    background: rgba(0, 190, 190, 0.2);
  }

  .name{
    font-family:'Source Sans Pro', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    text-align: left;
  }

  .defense{
    text-align: center;
  }

  .distance{
    text-align: center;
  }

  .accessible{
    font-weight: 800;
    background: rgba(0, 138, 23, 0.6);
  }

  .inaccessible{
    opacity: 0.8;
    background: rgba(255, 72, 0, 0.8);
  }
</style>