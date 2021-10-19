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
      <p>
        Carburant: {{ this.ship.carb.curr }}/{{ this.ship.carb.max }}
      </p>
      <tbody>
        <tr v-for="(galaxy, index) in galaxies" :key="index">
          <td>{{ galaxy.name }}</td>
          <td>{{ galaxy.prod }}</td>
          <td>{{ galaxy.def }}</td>
          <td>{{ galaxy.dist }}</td>
        </tr>
      </tbody>
    </table>
    <button @click="move(1)">Move</button>
    <button @click="AttackOrColonize('2')">Coloniser / Attaquer</button>
    <button @click="Improve('1', 'defense')">Constuire</button>
  </div>
</template>

<script>
export default {
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
  // Fetch data in parallel (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const [galaxies, ship] = await Promise.all([
      $axios
        .post('/fakeAPI', { api: 'GetVisiblePlanets' })
        .then((res) => res.data.galaxies),
      $axios.post('/fakeAPI', { api: 'GetShip' }).then((res) => res.data.ship),
    ])
    return { galaxies, ship }
  },
}
</script>