<template>
    <!-- <h1>{{root.params}}</h1> -->
    <section>
      <h1>{{planet.name}}</h1>
      <tbody v-if="planet.type === 'Planète'">
        <h2>Informations sur la planète</h2>
        <tr>
          <td>Type de planète : {{planet.planetType}}</td>
        </tr>
        <tr v-if="planet.colony">
          <td>Propriétaire : {{planet.colony.owner}}</td>
        </tr>
        <tr v-else>
          <td>Planète inhabitée</td>
        </tr>
        <tr v-if="planet.colony">
          <td v-if="isAllied || planet.colony.owner === ownCrew">Niveau de défense : {{ defenseLevelToValue(planet.colony.defenseLevel) }}</td>
          <td v-else-if="ship.pa">Niveau de défense : {{ defenseLevelToValue(planet.colony.defenseLevel) }} ({{(ship.pa/(parseInt(defenseLevelToValue(planet.colony.defenseLevel))+parseInt(ship.pa))*100).toFixed(0)}}%)</td>
          <td v-else>Niveau de défense : {{ defenseLevelToValue(planet.colony.defenseLevel) }} ({{(1/(parseInt(defenseLevelToValue(planet.colony.defenseLevel))+1)*100).toFixed(0)}}%)</td> <!-- default value, nothing built -->
        </tr>
        <h2>Production</h2>
        <tr>
          <td>Production de métal : {{planet.resources.metal }}/h</td>
        </tr>
        <tr>
          <td>Production de biomasse : {{planet.resources.biomass }}/h</td>
        </tr>
        <tr>
          <td>Production d'eau : {{planet.resources.water }}/h</td>
        </tr>
        <tr>
          <td>Production d'énergie : {{planet.resources.energy }}/h</td>
        </tr>
      </tbody>
      <tbody v-else>
        <p>Ceci est un objet stellaire.</p>
        <h2>Ressources à récupérer</h2>
        <tr>
          <td>Métal : {{planet.resources.metal }}</td>
        </tr>
        <tr>
          <td>Biomasse : {{planet.resources.biomass }}</td>
        </tr>
        <tr>
          <td>Eau : {{planet.resources.water }}</td>
        </tr>
        <tr>
          <td>Energie : {{planet.resources.energy }}</td>
        </tr>
      </tbody>
      
      <tbody>
        <tr v-if="planet.distance != 0 && planet.distance <= ship.carb.curr">
          <button @click="move(planet.id)">Explorer</button>
        </tr>
        <tr v-if="planet.type === 'Planète' && (!isAllied) && planet.colony && planet.colony.owner !== ownCrew">
          <button @click="AttackOrColonize(planet.id)">Attaquer</button>
        </tr>
        <tr v-else-if="planet.type === 'Planète' && (!isAllied) && !planet.colony">
          <button  @click="AttackOrColonize(planet.id)">Coloniser</button>
        </tr>
        <tr v-if="planet.colony && planet.colony.owner === ownCrew">
            <select name="buildings" id="buildings" class='buildings' v-model="building">
              <option value="defense">Défense</option>
              <option value="metal">Usine de métal</option>
              <option value="biomass">Usine de biomasse</option>
              <option value="water">Usine d'eau</option>
              <option value="energy">Usine d'énergie</option>
            </select>
          <button @click="Improve(planet.id, building)">Améliorer</button>
        </tr>
      </tbody>
    </section>
</template>

<script>
export default {
    layout:'planet',
    data() {
      return {
        building: 'defense'
      }
    },
    methods: {
    // Make a get request
    async move(aPlanetID) {
      var requestError = undefined
      const move = await this.$axios
        .post('/game/move', { planetID: aPlanetID })
        .then((res) => res.data)
        .catch(err => {
          console.log(err.response);
          requestError = err.response;
        })
      if (!requestError && move.outcome == "Moved") {
        alert('Vous vous êtes déplacés sur la planète ' + move.id)
        this.$router.push('/')
      } else if (requestError === 404 && requestError.data.reason === 'Not enough fuel') {
        alert(
          "Vous n'avez pas assez de carburant pour effectuer le déplacement."
        )
      } else { // Other errors that are no concern of the user
        alert(
          "Vous n'avez pas pu effectuer le déplacement pour une drôle de raison..."
        )
      }
    },
    // Make post requests
    async AttackOrColonize(aPlanetID) {
      const result = await this.$axios
        .post('/fakeAPI', { api: 'AttackOrColonize', planetID: aPlanetID })
        .then((res) => res.data)
      console.log(result)
      if (result.outcome) {
        if (result.type == 'combat') {
          if (result.outcome == 'victory') {
            alert('Combat gagné :)')
          } else {
            alert('Combat perdu :(')
          }
        } else if (result.type == 'colonization') {
          alert('Planète colonisée :)')
        }
      } else {
        alert('Pas assez de carburant.')
      }
    },
    async Improve(aPlanetID, aBuildingType) {
      const building = await this.$axios
        .post('/fakeAPI', {
          api: 'Improve',
          planetID: aPlanetID,
          buildingType: aBuildingType,
        })
        .then((res) => res.data.building)
      //console.log(building)
      if (building.actionSuccessful) {
        alert('Bâtiment construit !')
      } else {
        alert('Pas assez de ressources pour construire ce bâtiment.')
      }
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
  async asyncData({ params, $axios }) {
    // Get planet and ship from parameters
    const planet = params.planet
    const ship = params.ship
    const isAllied = params.isAllied

    // Get crewID
    const ownCrew = await $axios.get('/game/crew').then((res) => res.data.crew)
    return { planet, isAllied, ship, ownCrew }
  }
}
</script>


<style>
  .buildings{
    width: fit-content;
    background: rgba(0, 190, 190, 0.2);
    border: 1px solid #00bebe;
    padding-left: 1em;
    padding-right: 1em;
    color: #00bebe;
    font-weight: 800;
    height: 3rem;
    text-transform: uppercase;
    outline: none;
  }

  select option {
    width: fit-content;
    background: #150c51;
    border: none;
    padding-left: 1em;
    padding-right: 1em;
    color: #00bebe;
    font-weight: 800;
    height: 3rem;
    text-transform: uppercase;
    outline: none;
}
</style>