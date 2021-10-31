<template>
  <section class="content">
    <section id="militaryContent" class="researchContent">

      <img :src="require('~/static/military.svg')"/>
    </section>
    <section id="explorationContent" class="researchContent hidden">
      <img :src="require('~/static/exploration.svg')"/>
    </section>
    <section id="productionContent" class="researchContent hidden">
      <img :src="require('~/static/production.svg')"/>
    </section>
    <section id="cultureContent" class="researchContent hidden">
      <img :src="require('~/static/culture.svg')"/>
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
    section.researchContent{
        display: grid;
    }

    .hidden {
        display: none !important;
    }
</style>