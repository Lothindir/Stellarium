<template>
  <center>
    <table class="table table-striped table-bordered">
      <tbody>
          <tr>
              <td><img src="~/static/battleship.svg"/></td>
              <td>Puissance d'attaque: {{ship.pa}}</td>
          </tr>
          <tr>
              <td>Carburant: {{ship.carb.curr}}/{{ship.carb.max}}</td>
              <td>Recharge quotidienne: {{ship.recharge}}</td>
          </tr>
      </tbody>
    </table>
    <br /><br />
    <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Equipement</th>
              <th>Effet</th>
              <th>Coût</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(equipement, index) in ship.equipements" :key="index">
              <td>{{equipement.name}}</td>
              <td>{{equipement.effect}}</td>
              <td>{{equipement.cost}}</td>
          </tr>
      </tbody>
    </table>
    <NuxtLink to="/" tag="button">Explorer</NuxtLink>
    <NuxtLink to="/" tag="button">Attaquer / Coloniser</NuxtLink>
  </center>
</template>

<script>
export default {
  data() {
    return {
        ship: {
          pa: 54,
          carb: {curr: 625, max: 1000},
          recharge: 100,
          equipements: [
            {name: 'Blaster', effect: 'Attaque +6', cost: 'Equipé'},
            {name: 'Canon ionic', effect: 'Attaque +33', cost: 'Equipé'},
            {name: 'Pompe à proton', effect: 'Carburant +26', cost: '8 2 6'},
            {name: 'Panneau stellaire', effect: 'Recharge +12', cost: '2 3 4'},
          ]
        }
    };
  }
};
</script>
<style scoped>
    table {
      border-spacing: 50px;
      text-align: center;
    }
    button {
      margin: 10px;
    }
    img {
      max-width: 33%;
    }
</style>