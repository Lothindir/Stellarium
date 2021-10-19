<template>
  <div class="content">
    <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Classement<br>Féderation</th>
              <th>Militaire</th>
              <th>Production</th>
              <th>Economie</th>
              <th>Culture</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(score, index) in scoreBoard" :key="index">
              <td>{{score.federationName}}</td>
              <td>{{score.federationMilitary.score}} ({{score.federationMilitary.rank}})</td>
              <td>{{score.federationProduction.score}} ({{score.federationProduction.rank}})</td>
              <td>{{score.federationEconomics.score}} ({{score.federationEconomics.rank}})</td>
              <td>{{score.federationCulture.score}} ({{score.federationCulture.rank}})</td>
          </tr>
      </tbody>
    </table>
    <table class="table table-striped table-bordered">
      <thead>
          <tr>
              <th>Fédération<br>Equipage</th>
              <th>Militaire</th>
              <th>Production</th>
              <th>Economie</th>
              <th>Culture</th>
          </tr>
      </thead>
      <tbody>
          <tr v-for="(score, index) in crewScores" :key="index">
              <td>{{score.crewID}}</td>
              <td>{{score.military.score}} ({{score.military.rank}})</td>
              <td>{{score.production.score}} ({{score.production.rank}})</td>
              <td>{{score.economics.score}} ({{score.economics.rank}})</td>
              <td>{{score.culture.score}} ({{score.culture.rank}})</td>
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
              <td>Défis relevés</td>
              <td>{{crewInfos.activities.trials.done}}/{{crewInfos.activities.trials.max}}</td>
          </tr>
          <tr>
              <td>Epreuves effectuées</td>
              <td>{{crewInfos.activities.challenges.done}}/{{crewInfos.activities.challenges.max}}</td>
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
              <td v-for="(skill, index) in crewInfos.research" :key="index"><img width="32px" :src="require('~/static/'+skill.name+'.svg')"/> {{skill.numberDone}}/{{skill.max}}</td>
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
              <td v-for="(resource, index) in crewInfos.resources" :key="index">{{resource.name}}: {{resource.amount}}</td>
          </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  // Fetch data in parallel (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const [scoreBoard, crewScores, crewInfos] = await Promise.all([
      $axios.post('/fakeAPI', { api: 'GetScoreBoard' }).then((res) => res.data.scoreBoard),
      $axios.post('/fakeAPI', { api: 'GetCrewScores' }).then((res) => res.data.crewScores),
      $axios.post('/fakeAPI', { api: 'GetCrewInfos' }).then((res) => res.data.crewInfos)
    ]
    )
    console.log(scoreBoard)
    return { scoreBoard, crewScores, crewInfos }
  }
};
</script>