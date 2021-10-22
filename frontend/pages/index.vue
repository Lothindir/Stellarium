<template>
  <div class="content">
    <h1>Planètes visibles</h1>
    <h2>Planètes de ma fédération</h2>
    <div id="table">table</div>
  </div>
</template>

<script>

function fillTable(galaxy) {
  	galaxy.forEach(planet => {
      $('#table').append("<div>planet</div>");
    });
}

export default {
  methods: {
  //   // Make a get request
  //   async move(planetID) {
  //     const move = await fetch('/api/fakeAPI?api=Move&planetID=' + planetID)
  //       .then((res) => res.json())
  //       .then((data) => data.move)
  //     if (move.actionSuccessful) {
  //       alert('Vous vous êtes déplacés sur la planète ' + planetID)
  //     } else if (move.outcome == 'fuel') {
  //       alert(
  //         "Vous n'avez pas assez de carburant pour effectuer le déplacement."
  //       )
  //     } else {
  //       alert(
  //         "Vous n'avez pas pu effectuer le déplacement pour une drôle de raison..."
  //       )
  //     }
  //   },
  //   // Make post requests
  //   async AttackOrColonize(aPlanetID) {
  //     const result = await this.$axios
  //       .post('/fakeAPI', { api: 'AttackOrColonize', planetID: aPlanetID })
  //       .then((res) => res.data.result)
  //     console.log(result)
  //     if (result.actionSuccessful) {
  //       if (result.type == 'combat') {
  //         if (result.outcome == 'victory') {
  //           alert('Combat gagné :)')
  //         } else {
  //           alert('Combat perdu :(')
  //         }
  //       } else if (result.type == 'colonization') {
  //         alert('Planète colonisée :)')
  //       }
  //     } else {
  //       alert('Pas assez de carburant.')
  //     }
  //   },
  //   async Improve(aPlanetID, aBuildingType) {
  //     const building = await this.$axios
  //       .post('/fakeAPI', {
  //         api: 'Improve',
  //         planetID: aPlanetID,
  //         buildingType: aBuildingType,
  //       })
  //       .then((res) => res.data.building)
  //     console.log(building)
  //     if (building.actionSuccessful) {
  //       alert('Bâtiment construit !')
  //     } else {
  //       alert('Pas assez de ressources pour construire ce bâtiment.')
  //     }
  //   },
  },

  // Fetch data in parallel (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    await Promise.all([
      $axios
        .post('/fakeAPI', { api: 'GetVisiblePlanets' })
        .then(function(data){
          fillTable(data.data.galaxies)
        })
    ])
  }
}
</script>