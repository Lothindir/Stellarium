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
      <button id=CC0 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC0'))" @click="showChallengeDescription('CC0')">Centre culturel</button>
      <button id=ca1 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC1'))" @click="showChallengeDescription('CC1')">Beaux-arts</button>
      <button id=ca2 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC5'))" @click="showChallengeDescription('CC5')">Esthétique</button>
      <button id=ca3 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC9'))" @click="showChallengeDescription('CC9')">Génie artistique</button>
      <button id=ca4 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC13'))" @click="showChallengeDescription('CC13')">Liberté de penser</button>
      <button id=cb1 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC2'))" @click="showChallengeDescription('CC2')">Age des héros</button>
      <button id=cb2 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC6'))" @click="showChallengeDescription('CC6')">Age d'airain</button>
      <button id=cb3 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC10'))" @click="showChallengeDescription('CC10')">Age d'argent</button>
      <button id=cb4 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC14'))" @click="showChallengeDescription('CC14')">Age d'or</button>
      <button id=cb5 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC17'))" @click="showChallengeDescription('CC17')">Age du turgonium</button>
      <button id=cc1 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC3'))" @click="showChallengeDescription('CC3')">Historiographie</button>
      <button id=cc2 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC7'))" @click="showChallengeDescription('CC7')">Ethnographie</button>
      <button id=cc3 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC11'))" @click="showChallengeDescription('CC11')">Archéologie</button>
      <button id=cc4 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC15'))" @click="showChallengeDescription('CC15')">Echange culturel</button>
      <button id=cc5a v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC18'))" @click="showChallengeDescription('CC18')">Humanisme</button>
      <button id=cc5b v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC19'))" @click="showChallengeDescription('CC19')">Révolution culturelle</button>
      <button id=cd1 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC4'))" @click="showChallengeDescription('CC4')">Transcience</button>
      <button id=cd2 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC8'))" @click="showChallengeDescription('CC8')">Réforme</button>
      <button id=cd3 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC12'))" @click="showChallengeDescription('CC12')">Nouveauté</button>
      <button id=cd4 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC16'))" @click="showChallengeDescription('CC16')">Machinerie</button>
      <button id=cd5 v-bind:class="getClassFromChallengeStatus(cultureChallenges.find(x => x.id === 'CC20'))" @click="showChallengeDescription('CC20')">Diversité</button>
    </section>
    <section id="militaryContent" class="researchContent hidden">
      <h1>ingénierie militaire</h1>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=CM0 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM0'))" @click="showChallengeDescription('CM0')">Armement<p>attaque 2<br>defense 2</p></button>
      <button id=CM1 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM1'))" @click="showChallengeDescription('CM1')">Canons lasers<p>attaque 3</p></button>
      <button id=CM3 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM3'))" @click="showChallengeDescription('CM3')">Puissance laser I<p>attaque 5</p></button>
      <button id=CM5 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM5'))" @click="showChallengeDescription('CM5')">Puissance laser II<p>attaque 7</p></button>
      <button id=CM7 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM7'))" @click="showChallengeDescription('CM7')">Puissance laser III<p>attaque 9</p></button>
      <button id=CM2 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM2'))" @click="showChallengeDescription('CM2')">Boucliers énergetiques<p>defense 3</p></button>
      <button id=CM4 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM4'))" @click="showChallengeDescription('CM4')">Energie bleue<p>defense 5</p></button>
      <button id=CM6 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM6'))" @click="showChallengeDescription('CM6')">Energie rouge<p>defense 7</p></button>
      <button id=CM8 v-bind:class="getClassFromChallengeStatus(militaryChallenges.find(x => x.id === 'CM8'))" @click="showChallengeDescription('CM8')">Energie violette<p>defense 9</p></button>
    </section>
    <section id="explorationContent" class="researchContent hidden">
      <h1>Exploration</h1>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=CE0 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE0'))" @click="showChallengeDescription('CE0')">Aménagement<p>carburant max 10<br>recharge 10/j</p></button>
      <button id=CE1 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE1'))" @click="showChallengeDescription('CE1')">Bidon rouillé<p>carburant max 25</p></button>
      <button id=CE3 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE3'))" @click="showChallengeDescription('CE3')">Baignoire adaptée<p>carburant max 35</p></button>
      <button id=CE5 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE5'))" @click="showChallengeDescription('CE5')">Compresseur<p>carburant max 50</p></button>
      <button id=CE7 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE7'))" @click="showChallengeDescription('CE7')">Carburant quantique<p>carburant max 75</p></button>
      <button id=CE2 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE2'))" @click="showChallengeDescription('CE2')">Alambique<p>recharge 25/j</p></button>
      <button id=CE4 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE4'))" @click="showChallengeDescription('CE4')">Recycleur<p>recharge 35/j</p></button>
      <button id=CE6 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE6'))" @click="showChallengeDescription('CE6')">Catalyseur<p>recharge 50/j</p></button>
      <button id=CE8 v-bind:class="getClassFromChallengeStatus(explorationChallenges.find(x => x.id === 'CE8'))" @click="showChallengeDescription('CE8')">Accélérateur de particules<p>recharge 75/j</p></button>
    </section>
    <section id="productionContent" class="researchContent hidden">
      <h1>Production</h1>
      <div class="level" id="level5">V</div>
      <div class="level" id="level4">IV</div>
      <div class="level" id="level3">III</div>
      <div class="level" id="level2">II</div>
      <div class="level" id="level1">I</div>
      <div class="level" id="level0">Σ</div>
      <button id=CP0 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP0'))" @click="showChallengeDescription('CP0')">Usine</button>
      <button id=CP1  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP1'))" @click="showChallengeDescription('CP1')">Source de H2O<p>ISP + 3h</p></button>
      <button id=CP5  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP5'))" @click="showChallengeDescription('CP5')">Bisse sans fin<p>ISP + 3h</p></button>
      <button id=CP9  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP9'))" @click="showChallengeDescription('CP9')">Puit stellaire<p>ISP + 3h</p></button>
      <button id=CP13 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP13'))" @click="showChallengeDescription('CP13')">Pompe à énéergie solaire<p>ISP + 3h</p></button>
      <button id=CP17 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP17'))" @click="showChallengeDescription('CP17')">Barrage de l'Hongrin<p>ISP + 3h</p></button>
      <button id=CP2  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP2'))" @click="showChallengeDescription('CP2')">Pile nucléaire<p>ISP + 3h</p></button>
      <button id=CP6  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP6'))" @click="showChallengeDescription('CP6')">Batterie lunaire<p>ISP + 3h</p></button>
      <button id=CP10 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP10'))" @click="showChallengeDescription('CP10')">Batterie solaire<p>ISP + 3h</p></button>
      <button id=CP14 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP14'))" @click="showChallengeDescription('CP14')">Réservoir électrique<p>ISP + 3h</p></button>
      <button id=CP18 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP18'))" @click="showChallengeDescription('CP18')">Réservoir sans fond<p>ISP + 3h</p></button>
      <button id=CP3  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP3'))" @click="showChallengeDescription('CP3')">Charrue à air comprimé<p>ISP + 3h</p></button>
      <button id=CP7  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP7'))" @click="showChallengeDescription('CP7')">Terreau stellaire<p>ISP + 3h</p></button>
      <button id=CP11 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP11'))" @click="showChallengeDescription('CP11')">Engrais de lune<p>ISP + 3h</p></button>
      <button id=CP15 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP15'))" @click="showChallengeDescription('CP15')">Serre photovoltaïque<p>ISP + 3h</p></button>
      <button id=CP19 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP19'))" @click="showChallengeDescription('CP19')">Serre à gaz solaire<p>ISP + 3h</p></button>
      <button id=CP4  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP4'))" @click="showChallengeDescription('CP4')">Fillon de thurgonium<p>ISP + 3h</p></button>
      <button id=CP8  v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP8'))" @click="showChallengeDescription('CP8')">Gisement vertical<p>ISP + 3h</p></button>
      <button id=CP12 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP12'))" @click="showChallengeDescription('CP12')">Mine avec le petit chariot motorisé<p>ISP + 3h</p></button>
      <button id=CP16 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP16'))" @click="showChallengeDescription('CP16')">Marteau piqueur d'extraction laser<p>ISP + 3h</p></button>
      <button id=CP20 v-bind:class="getClassFromChallengeStatus(productionChallenges.find(x => x.id === 'CP20'))" @click="showChallengeDescription('CP20')">Carrière stellaire<p>ISP + 3h</p></button>
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
      var challengeClass = ''
      console.log(challenge.isValidated)
      if (challenge.isValidated && !challenge.isValidable) { // Done by crew, thus federation
        challengeClass = "validated federation"
      } else if (challenge.isValidable) { // Not done by crew
        challengeClass = "validable"
        if (challenge.isValidated) { // Done by federation
          challengeClass += " federation"
        }
      } else {
        challengeClass = "inaccessible"
      }
      return challengeClass
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

    button.federation{
      border: 4px double #00bebe;
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

    #CM0,#CE0{
      grid-column: 2/4;
      grid-row: 6/7;
    }

    #CM1,#CM3,#CM5,#CM7,#CE1,#CE3,#CE5,#CE7{
      grid-column: 2/3;
    }

    #CM2,#CM4,#CM6,#CM8,#CE2,#CE4,#CE6,#CE8{
      grid-column: 3/4;
    }

    #CM1,#CM2,#CE1,#CE2{
      grid-row: 5/6;
    }

    #CM3,#CM4,#CE3,#CE4{
      grid-row: 4/5;
    }

    #CM5,#CM6,#CE5,#CE6{
      grid-row: 3/4;
    }

    #CM7,#CM8,#CE7,#CE8{
      grid-row: 2/3;
    }



    #productionContent{
      grid-template-columns: 60px repeat(4, 1fr);
      grid-template-rows: 40px repeat(6,1fr);
    }

    #CP0{
      grid-column: 2/7;
      grid-row: 7/8;
    }

    #CP1,#CP5,#CP9,#CP13,#CP17{
      grid-column: 2/3;
    }

    #CP2,#CP6,#CP10,#CP14,#CP18{
      grid-column: 3/4;
    }

    #CP3,#CP7,#CP11,#CP15,#CP19{
      grid-column: 4/5;
    }

    #CP4,#CP8,#CP12,#CP16,#CP20{
      grid-column: 5/6;
    }

    #CP1,#CP2,#CP3,#CP4{
      grid-row: 6/7;
    }

    #CP5,#CP6,#CP7,#CP8{
      grid-row: 5/6;
    }

    #CP9,#CP10,#CP11,#CP12{
      grid-row: 4/5;
    }

    #CP13,#CP14,#CP15,#CP16{
      grid-row: 3/4;
    }

    #CP17,#CP18,#CP19,#CP20{
      grid-row: 2/3;
    }

</style>