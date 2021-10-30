<template>
    <header id="header">
        <nuxt-link 
            tag="img"
            class="stellarium-logo" 
            :src="require('~/static/logo_white.svg')" 
            to="/">
        </nuxt-link>
    </header>
</template>

<style scoped>
  #header {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
  }

  .stellarium-logo{
      max-width: 60%;
  }
</style>