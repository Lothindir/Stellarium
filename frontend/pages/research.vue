<template>
  <section class="content">
    <div class="level" id="level5">V</div>
    <div class="level" id="level4">IV</div>
    <div class="level" id="level3">III</div>
    <div class="level" id="level2">II</div>
    <div class="level" id="level1">I</div>
    <div class="level" id="level0">Σ</div>
    <section id="cultureContent" class="researchContent">
      <h1>Culture</h1>
      <button id=c0>Centre culturel</button>
      <button id=ca1>Beaux-arts</button>
      <button id=ca2>Esthétique</button>
      <button id=ca3>Génie artistique</button>
      <button id=ca4>Liberté de penser</button>
      <button id=cb1>Age des héros</button>
      <button id=cb2>Age d'airain</button>
      <button id=cb3>Age d'argent</button>
      <button id=cb4>Age d'or</button>
      <button id=cb5>Age du turgonium</button>
      <button id=cc1>Historiographie</button>
      <button id=cc2>Ethnographie</button>
      <button id=cc3>Archéologie</button>
      <button id=cc4>Echange culturel</button>
      <button id=cc5a>Humanisme</button>
      <button id=cc5b>Révolution culturelle</button>
      <button id=cd1>Transcience</button>
      <button id=cd2>Réforme</button>
      <button id=cd3>Nouveauté</button>
      <button id=cd4>Machinerie</button>
      <button id=cd5>Transhumanisme</button>
    </section>
    <section id="militaryContent" class="researchContent hidden">
      <h1>ingénierie militaire</h1>
    </section>
    <section id="explorationContent" class="researchContent hidden">
      <h1>Exploration</h1>
    </section>
    <section id="productionContent" class="researchContent hidden">
      <h1>Production</h1>
    </section>
  </section>
</template>

<script>
export default {
  layout: 'research',
  methods: {
  },
  // Fetch data (post) before rendering the page. No need of placeholder in the code, then.
  async asyncData({ params, $axios }) {
    const crewInfos = await $axios
      .post('/fakeAPI', { api: 'GetCrewInfos' })
      .then((res) => res.data.crewInfos)
    return { crewInfos }
  },
}
</script>
<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Quattrocento&display=swap');

    section.researchContent{
        display: grid;
    }

    .hidden {
        display: none !important;
    }

    .content{
      display: grid;
      grid-template-rows: 40px repeat(6,1fr);
      grid-column-gap: 0.4rem;
    }

    .level{
      grid-column: 1/2;
      align-self: center;
      justify-self: center;
      font-family: 'Quattrocento', serif;
      font-size: 3rem;
    }

    #level5{
      grid-row: 2/3;
    }

    #level4{
      grid-row: 3/4;
    }

    #level3{
      grid-row: 4/5;
    }

    #level2{
      grid-row: 5/6;
    }

    #level1{
      grid-row: 6/7;
    }

    #level0{
      grid-row: 7/8;
    }

    .researchContent{
      grid-column: 2/3;
      grid-row: 1/8;
      display: grid;
      grid-template-rows: 40px repeat(6,1fr);
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
      min-height: 3rem;
    }

    #cultureContent{
      grid-template-columns: repeat(5, 1fr);
    }

    #c0{
      grid-column: 1/6;
      grid-row: 7/8;
    }

    #ca1,#ca2,#ca3,#ca4{
      grid-column: 1/2;
    }

    #cb1,#cb2,#cb3,#cb4,#cb5{
      grid-column: 2/3;
    }

    #cc1,#cc2,#cc3,#cc4{
      grid-column: 3/5;
    }

    #cc5a{
      grid-column: 3/4;
    }

    #cc5b{
      grid-column: 4/5;
    }

    #cd1,#cd2,#cd3,#cd4,#cd5{
      grid-column: 5/6;
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


</style>