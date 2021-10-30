<template>
  <div class="content">
    <h1>Planètes</h1>
    <h2>Planètes visibles</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Nom</th>
          <th class="owner_name">Equipage</th>
          <th class="defense">Défense</th>
          <th class="distance">Distance<br>(Coord.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planet, index) in this.visiblePlanets" :key="index" class="planet" @click="inspect(planet, false)">
          <td class="name">{{ planet.name }}</td>
          <td v-if="planet.colony" class="owner_name enemy">{{ planet.colony }}</td>
          <td v-else class="owner_name">Aucun</td>
          <td class="defense">{{ planet.defenseLevel }} ({{(ship.pa/(parseInt(planet.defenseLevel)+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-if="planet.distance<ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          <!-- <td v-if="planet.dist<400"><button @click="move(planet.dist)">Explorer</button></td> -->
        </tr>
      </tbody>
    </table>
    <h2>Colonies possédées</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Nom</th>
          <th class="production">Production</th>
          <th class="defense">Défense</th>
          <th class="distance">Distance<br>(Coord.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planet, index) in this.planets.owned" :key="index" class="planet" @click="inspect(planet, true)">
          <td class="name">{{ planet.name }}</td>
          <td class="production">{{ planet.resources.metal }} {{ planet.resources.biomass }} {{ planet.resources.water }} {{ planet.resources.energy }}</td>
          <td class="defense">{{ planet.defenseLevel }} ({{(ship.pa/(parseInt(planet.defenseLevel)+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-if="planet.distance<ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
        </tr>
      </tbody>
    </table>
    <h2>Planètes alliées</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Nom</th>
          <th class="owner_name">Equipage</th>
          <th class="defense">Défense</th>
          <th class="distance">Distance<br>(Coord.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planet, index) in this.planets.allied" :key="index" class="planet" @click="inspect(planet, true)">
          <td class="name">{{ planet.name }}</td>
          <td v-if="planet.colony" class="owner_name">{{ planet.colony }}</td>
          <td class="defense">{{ planet.defenseLevel }} ({{(ship.pa/(parseInt(planet.defenseLevel)+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-if="planet.distance<=ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
        </tr>
      </tbody>
    </table>
    <h2>Autres objets stellaires visibles</h2>
    <table class="table">
      <thead>
        <tr>
          <th class="name">Nom</th>
          <th class="defense">Type</th>
          <th class="distance">Distance<br>(Coord.)</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(planet, index) in this.planets.objects" :key="index" class="planet" @click="inspect(planet, false)">
          <td class="name">{{ planet.name }}</td>
          <td class="defense">{{ planet.type }}</td>
          <td v-if="planet.distance<ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  computed: {
    visiblePlanets: function() {
      // Join attackable and colonizable (they are for sure planets)
      return (((this.planets.colonizable).concat(this.planets.attackable)).sort((a, b) => a.distance > b.distance))
    },
  },
  methods: {
    inspect(planet, isAllied){
      this.$router.push({
        name: 'planet',
        params: {planet : planet, isAllied: isAllied, ship: this.ship}
      })
    },
  },
  async fetch() { // Fetch when loading page
    this.ship = await fetch('/api/fakeAPI?api=GetShip') //await fetch('/api/game/ship') // Erreur 500...
      .then((res) => res.json())
      .then((data) => data.ship)
  },
  async asyncData({ params, $axios }) { // Async so we can use the values in computed data
    const [planets, ship] = await Promise.all([
      $axios.get('/game/planets/?owned&allied&attackable&colonizable&objects').then((res) => res.data),
      $axios.get('/fakeAPI?api=GetShip').then((res) => res.data.ship) // TODO: change to real API /game/ship
    ])
    return { planets, ship }
  }
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
    text-align: center;
  }

  .owner_name{
    text-align: center;
  }

  .production{
    text-align: center;
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

  .enemy{
    background: rgba(255, 72, 0, 0.8);
  }
</style>