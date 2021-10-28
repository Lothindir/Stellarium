<template>
    <div id="layout">
        <Header />
        <Nuxt />
        <FooterResearch />
    </div>
</template>

<style scoped>
    #layout {
    position: relative;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr; 
    grid-template-rows: 40px 1fr 120px; 
    gap: 0.5em 0; 
    grid-template-areas:
      "header"
      "content"
      "footer";
  }
</style>