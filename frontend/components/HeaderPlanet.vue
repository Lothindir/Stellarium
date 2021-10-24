<template>
    <header id="header">
        <nuxt-link 
            tag="img"
            class="stellarium-logo" 
            :src="require('~/static/logo_white.svg')" 
            to="/">
        </nuxt-link>
        <button id="left-arrow" class="off" @click="$router.go(-1)">
            <svg
                class="h-8 w-8"
                viewBox="0 0 32 32"
                fill="currentColor">
                <path d="M26.025 14.496l-14.286-.001 6.366-6.366L15.979 6 5.975 16.003 15.971 26l2.129-2.129-6.367-6.366h14.29z"/>
            </svg>
        </button>
    </header>
</template>

<script>
    export default{
        methods:{
            
        }
    } 
</script>

<style scoped>
  #header {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
  }

  .stellarium-logo{
      flex-basis: 40%;
  }

  #left-arrow{
      position: fixed;
      top: 0;
      left: 0;
      height: 55px;
      padding: 0.75em 1.2em 0.5em 1.2em;
      border-radius: 0;
      border:none;
      color:white;
      background:none;
  }
</style>