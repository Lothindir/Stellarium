<template>
  <div class="content">
    <table class="table table-striped table-bordered">
      <tbody>
        <tr>
          <td><img src="~/static/battleship.svg" /></td>
          <td>Puissance d'attaque: {{ ship.pa }}</td>
        </tr>
        <tr>
          <td>Carburant: {{ ship.carb.curr }}/{{ ship.carb.max }}</td>
          <td>Recharge quotidienne: {{ ship.recharge }}</td>
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
          <td>{{ equipement.name }}</td>
          <td>{{ equipement.effect }}</td>
          <td>{{ equipement.cost }}</td>
        </tr>
      </tbody>
    </table>
    <button @click='UpgradeShip("weapons")'>Améliorer l'armement</button>
    <button @click='UpgradeShip("maxFuel")'>Améliorer le carburant maximal</button>
    <button @click='UpgradeShip("fuelRecharge")'>Améliorer la vitesse de rechargement du carburant</button>
    <NuxtLink to="/" tag="button">Explorer</NuxtLink>
    <NuxtLink to="/" tag="button">Attaquer / Coloniser</NuxtLink>
  </div>
</template>

<script>
export default {
  methods: {
    async UpgradeShip(anUpgradeType) {
      const shipUpgrade = await this.$axios.post('/fakeAPI', { api: 'UpgradeShip', upgradeType: anUpgradeType }).then((res) => res.data.shipUpgrade)
      console.log(shipUpgrade)
      if (shipUpgrade.actionSuccessful) {
        alert("Tu as bien pu construire un nouvel armement: " + shipUpgrade.upgradeName)
      } else {
        alert("Impossible de construire : " + shipUpgrade.error)
      }
    }
  },
  async asyncData({ params, $axios }) {
    const ship = await $axios.post('/fakeAPI', { api: 'GetShip' }).then((res) => res.data.ship)
    return { ship }
  },
}
</script>