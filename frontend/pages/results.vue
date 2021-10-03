<template>
  <div class="content">
    <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Férédration<br>Equipage</th>
              <th>Score</th>
              <th>Rang</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(score, index) in scores" :key="index">
              <td>{{score.team}}</td>
              <td>{{score.points}}</td>
              <td>{{score.rank}}</td>
          </tr>
      </tbody>
    </table>
    <hr>
    <table class="table table-striped table-bordered">
      <tbody>
          <tr>
              <td><img width="32px" src="~/static/challenges.svg"/></td>
          </tr>
          <tr>
              <td>Epreuves gagnées</td>
              <td>{{rewards.trials}}</td>
          </tr>
          <tr>
              <td>Défis relevés</td>
              <td>{{rewards.challenges}}</td>
          </tr>
      </tbody>
    </table>
    <hr>
    <table class="table table-striped table-bordered">
      <tbody>
          <tr>
              <td><img width="32px" src="~/static/research.svg"/></td>
              <td>Recherche</td>
          </tr>
          <tr>
              <td v-for="(skill, index) in skills" :key="index"><img width="32px" :src="require('~/static/'+skill.name+'.svg')"/> {{skill.count}}</td>
          </tr>
      </tbody>
    </table>
    <hr>
    <table class="table table-striped table-bordered">
      <tbody>
          <tr>
              <td><img width="32px" src="~/static/resources.svg"/></td>
              <td>Ressources</td>
          </tr>
          <tr>
              <td v-for="(resource, index) in resources" :key="index"> {{resource.count}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
        scores: [
          {team: 'Grayephus', points: 1589, rank: 5},
          {team: 'Theoter', points: 348, rank: 14}
        ],
        skills: [
          {name: 'culture', count: 4},
          {name: 'war', count: 12},
          {name: 'exploration', count: 7},
          {name: 'production', count: 6},
        ],
        rewards: {
          trials: 4,
          challenges: 12,
        },
        resources: [
          {name: 'water', count: 1234},
          {name: 'energy', count: 324},
          {name: 'plant', count: 78},
          {name: 'ruby', count: 225},
        ]
    };
  },
};
</script>
<style scoped>
    .content {
        width: 30%;
        margin: auto;
    }
    table {
      border-spacing: 30px;
      text-align: start;
    }
</style>