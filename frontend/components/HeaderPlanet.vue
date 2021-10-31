<template>
    <header>
        <section id="header">
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
        </section>
        <section id="resources">
            <p v-if="$fetchState.pending">Comptage des ressources...</p>
            <p v-else-if="$fetchState.error">Impossible de compter les ressources</p>
            <div v-for="(resource, index) in this.resources" :key="index" class="resource" :id="resource.name">
                <img class="resource-logo" :src="require('~/static/'+resource.name+'.svg')"/>
                <p class="resource-value">{{resource.amount}}</p>
            </div>
        </section>
    </header>
</template>

<script>
    export default{
        data() {
            return {
                resources: [],
            }
        },
        methods:{
            
        },
        async fetch() { // Fetch when loading page
            this.resources = await fetch('/api/fakeAPI?api=GetCrewInfos')
            .then((res) => res.json())
            .then((data) => data.crewInfos.resources)
        },
    } 
</script>

<style scoped>
  #header {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
  }

  #resources {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
    margin-top: 10px;
    padding: 0.2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.3);
  }
  .resource{
      display: flex;
      align-items: center;
      font-size: 0.9rem;
  }
  .resource-logo{
      height: 1.4rem;
  }
  .stellarium-logo{
      max-width: 60%;
      max-height: 2.5rem;
  }
  #metal .resource-logo{
      margin-right: 0.2rem;
  }
  
  #water .resource-logo{
      margin-right: 0.1rem;
  }

  .stellarium-logo{
      max-width: 60%;
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