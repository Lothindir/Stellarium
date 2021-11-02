<template>
  <section class="content">
    <section id="cultureContent" class="researchContent">
      <h1>Culture</h1>
      <div class="level" id="level5">V</div>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <!--<button v-for="(planet, index) in crewInfo" :key="index">test</button> -->
      <button id=CC0 class="validated" @click="showChallengeDescription('CC0')">Centre culturel</button>
      <button id=ca1 class="validated">Beaux-arts</button>
      <button id=ca2 class="validated">Esthétique</button>
      <button id=ca3 class="validable">Génie artistique</button>
      <button id=ca4 class="inaccessible">Liberté de penser</button>
      <button id=cb1 class="validated">Age des héros</button>
      <button id=cb2 class="validated">Age d'airain</button>
      <button id=cb3 class="validated">Age d'argent</button>
      <button id=cb4 class="validable">Age d'or</button>
      <button id=cb5 class="inaccessible">Age du turgonium</button>
      <button id=cc1 class="validated">Historiographie</button>
      <button id=cc2 class="validated">Ethnographie</button>
      <button id=cc3 class="validated">Archéologie</button>
      <button id=cc4 class="validable">Echange culturel</button>
      <button id=cc5a class="inaccessible">Humanisme</button>
      <button id=cc5b class="inaccessible">Révolution culturelle</button>
      <button id=cd1 class="validated">Transcience</button>
      <button id=cd2 class="validable">Réforme</button>
      <button id=cd3 class="inaccessible">Nouveauté</button>
      <button id=cd4 class="inaccessible">Machinerie</button>
      <button id=cd5 class="inaccessible">Transhumanisme</button>
    </section>
    <section id="militaryContent" class="researchContent hidden">
      <h1>ingénierie militaire</h1>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=m0 class="validated">Armement<p>attaque 2<br>defense 2</p></button>
      <button id=ma1 class="validated">Canons lasers<p>attaque 3</p></button>
      <button id=ma2 class="validable">Puissance laser I<p>attaque 5</p></button>
      <button id=ma3 class="inaccessible">Puissance laser II<p>attaque 7</p></button>
      <button id=ma4 class="inaccessible">Puissance laser III<p>attaque 9</p></button>
      <button id=mb1 class="validable">Boucliers énergetiques<p>defense 3</p></button>
      <button id=mb2 class="inaccessible">Energie bleue<p>defense 5</p></button>
      <button id=mb3 class="inaccessible">Energie rouge<p>defense 7</p></button>
      <button id=mb4 class="inaccessible">Energie violette<p>defense 9</p></button>
    </section>
    <section id="explorationContent" class="researchContent hidden">
      <h1>Exploration</h1>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=e0 class="validated">Aménagement<p>carburant max 10<br>recharge 10/j</p></button>
      <button id=ea1 class="validated">Bidon rouillé<p>carburant max 25</p></button>
      <button id=ea2 class="validable">Baignoire adaptée<p>carburant max 35</p></button>
      <button id=ea3 class="inaccessible">Compresseur<p>carburant max 50</p></button>
      <button id=ea4 class="inaccessible">Carburant quantique<p>carburant max 75</p></button>
      <button id=eb1 class="validable">Alambique<p>recharge 25/j</p></button>
      <button id=eb2 class="inaccessible">Recycleur<p>recharge 35/j</p></button>
      <button id=eb3 class="inaccessible">Catalyseur<p>recharge 50/j</p></button>
      <button id=eb4 class="inaccessible">Accélérateur de particules<p>recharge 75/j</p></button>
    </section>
    <section id="productionContent" class="researchContent hidden">
      <h1>Production</h1>
      <div class="level" id="level5">V</div>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=p0 class="validated">Usine</button>
      <button id=pa1 class="validated">Source de H2O<p>ISP + 3h</p></button>
      <button id=pa2 class="validated">Bisse sans fin<p>ISP + 3h</p></button>
      <button id=pa3 class="validable">Puit stellaire<p>ISP + 3h</p></button>
      <button id=pa4 class="inaccessible">Pompe à énéergie solaire<p>ISP + 3h</p></button>
      <button id=pa5 class="inaccessible">Barrage de l'Hongrin<p>ISP + 3h</p></button>
      <button id=pb1 class="validated">Pile nucléaire<p>ISP + 3h</p></button>
      <button id=pb2 class="validated">Batterie lunaire<p>ISP + 3h</p></button>
      <button id=pb3 class="validated">Batterie solaire<p>ISP + 3h</p></button>
      <button id=pb4 class="validable">Réservoir électrique<p>ISP + 3h</p></button>
      <button id=pb5 class="inaccessible">Réservoir sans fond<p>ISP + 3h</p></button>
      <button id=pc1 class="validated">Charrue à air comprimé<p>ISP + 3h</p></button>
      <button id=pc2 class="validated">Terreau stellaire<p>ISP + 3h</p></button>
      <button id=pc3 class="validated">Engrais de lune<p>ISP + 3h</p></button>
      <button id=pc4 class="validable">Serre photovoltaïque<p>ISP + 3h</p></button>
      <button id=pc5 class="inaccessible">Serre à gaz solaire<p>ISP + 3h</p></button>
      <button id=pd1 class="validated">Fillon de thurgonium<p>ISP + 3h</p></button>
      <button id=pd2 class="validable">Gisement vertical<p>ISP + 3h</p></button>
      <button id=pd3 class="inaccessible">Mine avec le petit chariot motorisé<p>ISP + 3h</p></button>
      <button id=pd4 class="inaccessible">Marteau piqueur d'extraction laser<p>ISP + 3h</p></button>
      <button id=pd5 class="inaccessible">Carrière stellaire<p>ISP + 3h</p></button>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'research',
  Data() {
    tmpChallengesInfo: []
  },
  methods: {
    async showChallengeDescription(id) {
      alert(id + "\n" + this.challengesInfo[id])
      console.log(this.cultureChallenges[0])
    },
    getClassFromChallengeStatus(challenge) {
      console.log(challenge.isValidated)
      if (challenge.isValidated && !challenge.isValidable) {
        return "validated"
      } else if (challenge.isValidable) {
        return "validable" // But already done in federation or not done at all
      } else {
        return "inaccessible"
      }
    }
  },
  // Fetch data (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const [crewInfo, tmpChallengesInfo] = await  Promise.all(
      [$axios
      .post('/fakeAPI', { api: 'GetCrewInfo' })
      .then((res) => res.data.crewInfo),
      $axios
      .get('/challenges')
      .then((res) => res.data),
    ])
    const challengesInfo = tmpChallengesInfo.reduce((a, v) => ({ ...a, [v.id]: v.description}), {}) 
    const cultureChallenges =  crewInfo.challenges.filter(a => a.id.includes('CC'))
    const explorationChallenges = crewInfo.challenges.filter(a => (a.id).includes('CE'))
    const productionChallenges = crewInfo.challenges.filter(a => (a.id).includes('CP'))
    const militaryChallenges = crewInfo.challenges.filter(a => (a.id).includes('CM'))
    console.log(militaryChallenges)
    return { cultureChallenges, explorationChallenges, productionChallenges, militaryChallenges, challengesInfo }
  },
}
</script>
<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Quattrocento&display=swap');

    .content{
      display: grid;
    }

    section.researchContent{
        display: grid;
    }

    .hidden {
        display: none !important;
    }

    .level{
      grid-column: 1/2;
      align-self: center;
      justify-self: center;
      font-family: 'Quattrocento', serif;
      font-size: 3rem;
    }

    #level5{
      grid-row: -7/-6;
    }

    #level4{
      grid-row: -6/-5;
    }

    #level3{
      grid-row: -5/-4;
    }

    #level2{
      grid-row: -4/-3;
    }

    #level1{
      grid-row: -3/-2;
    }

    #level0{
      grid-row: -2/-1;
    }

    .researchContent{
      display: grid;
      grid-column-gap: 0.4rem;
      align-items: center;
      justify-items: center;
    }

    h1{
      justify-self: self-start;
      grid-column: 1/end;
      grid-row: 1/2;
    }

    button{
      padding-left: 0.4rem;
      padding-right: 0.4rem;
      height: fit-content;
      font-size: smaller;
      font-weight: 600;
      min-height: 3rem;
      line-height: 100%;
    }

    button.validated{
      background: none;
      border: 4px double #00bebe;
      color: #00bebe;
    }

    button.validable{
      background: rgba(0, 190, 190, 0.2);
      border: 1px solid #00bebe;
      color: #00bebe;
    }

    button.inaccessible{
      background: #c0c0c022;
      border: 1px dashed #c0c0c0;
      color: #bbbbbb;
      opacity: 0.6;
    }

    button>p{
      font-weight: 400;
      text-transform: none;
      font-style: italic;
    }

    #cultureContent{
      grid-template-columns: 60px repeat(5, 1fr);
      grid-template-rows: 40px repeat(6,1fr);
    }

    #CC0{
      grid-column: 2/7;
      grid-row: 7/8;
    }

    #ca1,#ca2,#ca3,#ca4{
      grid-column: 2/3;
    }

    #cb1,#cb2,#cb3,#cb4,#cb5{
      grid-column: 3/4;
    }

    #cc1,#cc2,#cc3,#cc4{
      grid-column: 4/6;
    }

    #cc5a{
      grid-column: 4/5;
    }

    #cc5b{
      grid-column: 5/6;
    }

    #cd1,#cd2,#cd3,#cd4,#cd5{
      grid-column: 6/7;
    }

    #ca1,#cb1,#cc1,#cd1{
      grid-row: 6/7;
    }

    #ca2,#cb2,#cc2,#cd2{
      grid-row: 5/6;
    }

    #ca3,#cb3,#cc3,#cd3{
      grid-row: 4/5;
    }

    #ca4,#cb4,#cc4,#cd4{
      grid-row: 3/4;
    }

    #cb5,#cc5a,#cc5b,#cd5{
      grid-row: 2/3;
    }

    #militaryContent,#explorationContent{
      grid-template-columns: 60px repeat(2, 1fr);
      grid-template-rows: 40px repeat(5,1fr);
    }

    #m0,#e0{
      grid-column: 2/4;
      grid-row: 6/7;
    }

    #ma1,#ma2,#ma3,#ma4,#ea1,#ea2,#ea3,#ea4{
      grid-column: 2/3;
    }

    #mb1,#mb2,#mb3,#mb4,#eb1,#eb2,#eb3,#eb4{
      grid-column: 3/4;
    }

    #ma1,#mb1,#ea1,#eb1{
      grid-row: 5/6;
    }

    #ma2,#mb2,#ea2,#eb2{
      grid-row: 4/5;
    }

    #ma3,#mb3,#ea3,#eb3{
      grid-row: 3/4;
    }

    #ma4,#mb4,#ea4,#eb4{
      grid-row: 2/3;
    }



    #productionContent{
      grid-template-columns: 60px repeat(4, 1fr);
      grid-template-rows: 40px repeat(6,1fr);
    }

    #p0{
      grid-column: 2/7;
      grid-row: 7/8;
    }

    #pa1,#pa2,#pa3,#pa4,#pa5{
      grid-column: 2/3;
    }

    #pb1,#pb2,#pb3,#pb4,#pb5{
      grid-column: 3/4;
    }

    #pc1,#pc2,#pc3,#pc4,#pc5{
      grid-column: 4/5;
    }

    #pd1,#pd2,#pd3,#pd4,#pd5{
      grid-column: 5/6;
    }

    #pa1,#pb1,#pc1,#pd1{
      grid-row: 6/7;
    }

    #pa2,#pb2,#pc2,#pd2{
      grid-row: 5/6;
    }

    #pa3,#pb3,#pc3,#pd3{
      grid-row: 4/5;
    }

    #pa4,#pb4,#pc4,#pd4{
      grid-row: 3/4;
    }

    #pa5,#pb5,#pc5,#pd5{
      grid-row: 2/3;
    }

</style>