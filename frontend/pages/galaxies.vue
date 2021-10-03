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
      <tbody>
          <tr v-for="(galaxy, index) in galaxies" :key="index">
              <td>{{galaxy.name}}</td>
              <td>{{galaxy.prod}}</td>
              <td>{{galaxy.def}}</td>
              <td>{{galaxy.dist}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        galaxies: [
            { name: 'Theoter', prod: '2 2 5 2', def: '53', dist: '324' },
            { name: 'Mutune', prod: '1 3 2 1', def: '33', dist: '498' },
            { name: 'Xolmilia', prod: '2 2 1 4', def: '23', dist: '3389' },
            { name: 'Bulezuno', prod: '3 2 1 2', def: '12', dist: '0' },
            { name: 'Lamoahiri', prod: '2 2 2 2', def: '42', dist: '39' }
        ]
    };
  }
};
</script>
<style scoped>
    .content {
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
    table {
      border-spacing: 50px;
      text-align: center;
    }
</style>