<template>
    <!-- <h1>{{root.params}}</h1> -->
    <section>
        <h1>{{this.$route.params.id}} {{this.$route.params.name}}</h1>
    </section>
</template>

<script>
export default {
    layout:'planet',
    async fetch() { // Fetch when loading page
    this.galaxies = await fetch('/api/fakeAPI?api=GetVisiblePlanets')
      .then((res) => res.json())
      .then((data) => data.galaxies[0])
  }
}
</script>
