<template>
  <div class="content">
    <img id="ship-logo" src="~/static/battleship-color.svg" />
    <div id="ship-stats">
      <div id="attack" class="stat">
        <p v-if="ship.pa" class="stat-value">{{ ship.pa }}</p>
        <p v-else class="stat-value">1</p> <!-- default value, nothing built -->
        <p class="stat-title">Puissance d'attaque</p>
        <img class="stat-icon" src="~/static/attack.svg" />
      </div>
      <div id="fuel" class="stat">
        <p class="stat-value">{{ Math.floor(ship.carb.curr) }}/{{ ship.carb.max }}</p>
        <p class="stat-title">Carburant</p>
        <img class="stat-icon" src="~/static/fuel.svg" />
      </div>
      <div id="refill" class="stat">
        <p v-if="ship.recharge" class="stat-value">+{{ ship.recharge }}</p>
        <p v-else class="stat-value">+25</p> <!-- default value, nothing built -->
        <p class="stat-title">Recharge quotidienne</p>
        <img class="stat-icon" src="~/static/refill.svg" />
      </div>
    </div>
    <div id="actions">
      <button id="upgrade-attack" @click="UpgradeShip('weapons')">Améliorer l'armement</button>
      <button id="upgrade-fuel" @click="UpgradeShip('maxFuel')">Agrandir le reservoir</button>
      <button id="upgrade-refill" @click="UpgradeShip('fuelRecharge')">Améliorer la recharge</button>
    </div>
    <div id="equipments" v-if="ship.equipements">
      <h2>Équipement</h2>
      <div class="equipment" v-for="(equipement, index) in ship.equipements" :key="index">
          <div>{{ equipement.name }}</div>
          <div>{{ equipement.effect }}</div>
          <div>{{ equipement.cost }}</div>
      </div>
    </div>
    <div id="equipments" v-else>
      Aucun équipement supplémentaire n'a été construit sur ce vaisseau
    </div>
  </div>
</template>

<script>
export default {
  layout:'ship',
  methods: {
    // Make a post request
    async UpgradeShip(anUpgradeType) {
      const shipUpgrade = await this.$axios
        .post('/fakeAPI', { api: 'UpgradeShip', upgradeType: anUpgradeType })
        .then((res) => res.data.shipUpgrade)
      console.log(shipUpgrade)
      if (shipUpgrade.actionSuccessful) {
        alert(
          'Tu as bien pu construire un nouvel armement: ' +
            shipUpgrade.upgradeName
        )
      } else {
        alert('Impossible de construire : ' + shipUpgrade.error)
      }
    },
  },
  // Fetch data before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const ship = await $axios.get('/game/ship').then((res) => res.data)
    //console.log(ship)
    return { ship }
  },
}
</script>

<style scoped>
  .content{
    display: grid;
    grid-template-columns:1fr 2.5fr 1fr;
    grid-template-rows:1fr 1fr 1fr 3fr;

  }

  #ship-logo{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
  }

  #ship-stats{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 2;
    grid-row-end: 3;
    display: grid;
    grid-template-columns:1fr 1.5fr 1.1fr;
  }

  .stat{
    display: grid;
    grid-template-columns: 0.5fr 1.2fr 1fr 1fr 1fr 0.5fr;
    grid-template-rows:1fr 1.3fr;
    text-align: center;
  }

  .stat-value{
    grid-column-start: 3;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
    font-family:'Source Sans Pro', sans-serif;
    font-weight: 900;
    font-size: 2rem;
  }

  .stat-icon{
    grid-column-start: 2;
    grid-column-end: 3;
    grid-row-start: 1;
    grid-row-end: 2;
    align-self: center;
  }

  .stat-title{
    grid-column-start: 1;
    grid-column-end: 7;
    grid-row-start: 2;
    grid-row-end: 3;
    font-weight: 900;
  }

  #equipments{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 4;
    grid-row-end: 5;
  }

  .equipment{
    display: grid;
    grid-auto-columns: auto;
  }

  #actions{
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 3;
    grid-row-end: 4;
    display: grid;
    grid-template-columns: 1fr 0.1fr 1.2fr 0.1fr 1.1fr;
    font-size: smaller;
  }

  button{
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: fit-content;
  }

  #upgrade-attack{
    grid-column-start: 1;
    grid-column-end: 2;
  }

  #upgrade-fuel{
    grid-column-start: 3;
    grid-column-end: 4;
  }

  #upgrade-refill{
    grid-column-start: 5;
    grid-column-end: 6;
  }

</style>