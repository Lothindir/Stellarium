<template>
  <div class="content">
    <h1>objets stellaires</h1>
    <h2>Planètes visibles</h2>
    <div v-if="$fetchState.error">Impossible de scanner la galaxie actuellement</div>
    <div v-else-if="$fetchState.pending">Scan de la galaxie en cours...</div>
    <div v-else>
      <table v-if="visiblePlanets.length > 0" class="table">
        <thead >
          <tr>
            <th class="name">Nom</th>
            <th class="owner_name">Equipage</th>
            <th class="defense">Défense</th>
            <th class="distance">Distance<br>(Coord.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(planet, index) in visiblePlanets" :key="index" class="planet" @click="inspect(planet, false)">
            <td class="name">{{ planet.name }}</td>
            <td v-if="planet.colony" class="owner_name enemy">{{ planet.colony.owner }}</td>
            <td v-else class="owner_name">Aucun</td>
            <td v-if="planet.colony && ship.pa" class="defense">{{ defenseLevelToValue(planet.colony.defenseLevel) }} ({{(ship.pa/(parseInt(defenseLevelToValue(planet.colony.defenseLevel))+parseInt(ship.pa))*100).toFixed(0)}}%)</td> 
            <td v-else-if="planet.colony" class="defense">{{ defenseLevelToValue(planet.colony.defenseLevel) }} ({{(1/(parseInt(defenseLevelToValue(planet.colony.defenseLevel))+1)*100).toFixed(0)}}%)</td> <!-- default value, nothing built -->
            <td v-else planet.colony class="defense">N/A</td>
            <td v-if="planet.distance<=ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
            <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
            <!-- <td v-if="planet.dist<400"><button @click="move(planet.dist)">Explorer</button></td> -->
          </tr>
        </tbody>
      </table>
      <h2>Colonies possédées</h2>
      <table planets.owned class="table">
        <thead>
          <tr>
            <th class="name">Nom</th>
            <th class="production">Production</th>
            <th class="defense">Défense</th>
            <th class="distance">Distance<br>(Coord.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(planet, index) in planets.owned" :key="index" class="planet" @click="inspect(planet, true)">
            <td class="name">{{ planet.name }}</td>
            <td class="production">{{ planet.resources.metal }} {{ planet.resources.biomass }} {{ planet.resources.water }} {{ planet.resources.energy }}</td>
            <td class="defense">{{ defenseLevelToValue(planet.colony.defenseLevel) }}</td>
            <td v-if="planet.distance<=ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
            <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          </tr>
        </tbody>
      </table>
      <h2>Planètes alliées</h2>
      <table class="table">
        <thead v-if="planets.allied.length > 0">
          <tr>
            <th class="name">Nom</th>
            <th class="owner_name">Equipage</th>
            <th class="defense">Défense</th>
            <th class="distance">Distance<br>(Coord.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(planet, index) in planets.allied" :key="index" class="planet" @click="inspect(planet, true)">
            <td class="name">{{ planet.name }}</td>
            <td v-if="planet.colony" class="owner_name">{{ planet.colony.owner }}</td>
            <td class="defense">{{ defenseLevelToValue(planet.colony.defenseLevel) }}</td>
            <td v-if="planet.distance<=ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
            <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          </tr>
        </tbody>
      </table>
      <h2>Autres objets stellaires visibles</h2>
      <table v-if="planets.objects.length > 0" class="table">
        <thead>
          <tr>
            <th class="name">Nom</th>
            <th class="defense">Type</th>
            <th class="distance">Distance<br>(Coord.)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(planet, index) in planets.objects" :key="index" class="planet" @click="inspect(planet, false)">
            <td class="name">{{ planet.name }}</td>
            <td class="defense">{{ planet.type }}</td>
            <td v-if="planet.distance<=ship.carb.curr" class="distance accessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
            <td v-else class="distance inaccessible">{{ Math.ceil(planet.distance) }}<br>({{ planet.coordinates[0] }}, {{planet.coordinates[1]}})</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  layout:'galaxy',
  data() {
    return {
      planets: [],
      visiblePlanets: []
    }
  },
  methods: {
    inspect(planet, isAllied) {
      this.$router.push({
        name: 'planet',
        params: {planet : planet, isAllied: isAllied, ship: this.ship}
      })
    },
    defenseLevelToValue(defenseLevel) {
      switch(defenseLevel) {
        case 0: // ISP -> undefined?
          return 1
        case 1:
          return 2
        case 2:
          return 3
        case 3:
          return 5
        case 4:
          return 7
        case 5:
          return 9
        default:
          return 1 // ISP -> undefined?
      }
    },
  },
  async asyncData({ params, $axios }) { // Async so we can use the values in computed data
    const [ship] = await Promise.all([
      $axios.get('/game/ship').then((res) => res.data)
    ])
    //console.log(ship)
    return { ship }
  },
  async fetch() {
    this.planets = await fetch('api/game/planets/?owned&allied&attackable&colonizable&objects').then((res) => res.json())
    this.visiblePlanets = (((this.planets.colonizable).concat(this.planets.attackable)).sort((a, b) => a.distance > b.distance))
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
    background: rgba(255, 72, 0, 0.6);
  }
</style>