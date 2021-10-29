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
          <td>Niveau de défense: {{planet.defenseLevel}}</td>
        </tr>
        <h2>Production</h2>
        <tr>
          <td>Usine de métal: {{planet.resources.metal }}</td>
        </tr>
        <tr>
          <td>Usine de biomasse: {{planet.resources.biomass }}</td>
        </tr>
        <tr>
          <td>Usine d'eau: {{planet.resources.water }}</td>
        </tr>
        <tr>
          <td>Usine d'énergie: {{planet.resources.energy }}</td>
        </tr>
      </tbody>
      <p v-if="planet.type != 'Planète'">Ceci est un objet stellaire.</p>
      <tbody>
        <tr>
          <button @click="move(planet.id)">Explorer</button> <!-- add "v-if planet.distance != 0"  -->
        </tr>
        <tr>
          <button v-if="planet.type === 'Planète'" @click="AttackOrColonize(planet.id)">Coloniser / Attaquer</button> <!-- add "and planet.owner != user.name"  -->
        </tr>
        <tr>
          <button v-if="planet.type === 'Planète'" @click="Improve(planet.id, 'defense')">Constuire</button> <!-- add "and planet.owner === user.name"  -->
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
    const planet = await $axios.get('/stellarobjects/' + params.id).then((res) => res.data)
    return { planet }
  }
}
</script>
