<template>
    <!-- <h1>{{root.params}}</h1> -->
    <section>
      <h1>{{planet.name}}</h1>
      <tbody v-if="planet.type === 'Planète'">
        <h2>Informations sur la planète</h2>
        <tr>
          <td>Type de planète: {{planet.planetType}}</td>
        </tr>
        <tr>
          <td v-if="planet.colony">Niveau de défense: {{planet.colony.infrastructure}}</td>
        </tr>
        <h2>Production</h2>
        <tr>
          <td>Production de métal: {{planet.resources.metal }}/h</td>
        </tr>
        <tr>
          <td>Production de biomasse: {{planet.resources.biomass }}/h</td>
        </tr>
        <tr>
          <td>Production d'eau: {{planet.resources.water }}/h</td>
        </tr>
        <tr>
          <td>Production d'énergie: {{planet.resources.energy }}/h</td>
        </tr>
      </tbody>
      <tbody v-else>
        <p>Ceci est un objet stellaire.</p>
        <h2>Ressources à récupérer</h2>
        <tr>
          <td>Métal: {{planet.resources.metal }}</td>
        </tr>
        <tr>
          <td>Biomasse: {{planet.resources.biomass }}</td>
        </tr>
        <tr>
          <td>Eau: {{planet.resources.water }}</td>
        </tr>
        <tr>
          <td>Energie: {{planet.resources.energy }}</td>
        </tr>
      </tbody>
      
      <tbody>
        <tr v-if="planet.distance != 0 && planet.distance <= ship.carb.curr">
          <button @click="move(planet.id)">Explorer</button>
        </tr>
        <tr v-if="planet.type === 'Planète' && (!isAllied) && planet.colony">
          <button @click="AttackOrColonize(planet.id)">Attaquer</button>
        </tr>
        <tr v-else-if="planet.type === 'Planète' && (!isAllied) && !planet.colony">
          <button  @click="AttackOrColonize(planet.id)">Coloniser</button>
        </tr>
        <tr>
          <button v-if="planet.colony && planet.colony.owner === ownCrew" @click="Improve(planet.id, 'defense')">Constuire</button>
        </tr>
      </tbody>
    </section>
</template>

<script>
export default {
    layout:'planet',
    methods: {
    // Make a get request
    async move(planetID) {
      const move = await fetch('/api/fakeAPI?api=Move&planetID=' + planetID)
        .then((res) => res.json())
        .then((data) => data.move)
      if (move.actionSuccessful) {
        alert('Vous vous êtes déplacés sur la planète ' + planetID)
      } else if (move.outcome == 'fuel') {
        alert(
          "Vous n'avez pas assez de carburant pour effectuer le déplacement."
        )
      } else {
        alert(
          "Vous n'avez pas pu effectuer le déplacement pour une drôle de raison..."
        )
      }
    },
    // Make post requests
    async AttackOrColonize(aPlanetID) {
      const result = await this.$axios
        .post('/fakeAPI', { api: 'AttackOrColonize', planetID: aPlanetID })
        .then((res) => res.data.result)
      console.log(result)
      if (result.actionSuccessful) {
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
      console.log(building)
      if (building.actionSuccessful) {
        alert('Bâtiment construit !')
      } else {
        alert('Pas assez de ressources pour construire ce bâtiment.')
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
