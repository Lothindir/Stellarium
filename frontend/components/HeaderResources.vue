<template>
    <header>
        <section id="header">
            <nuxt-link 
                tag="img"
                class="stellarium-logo" 
                :src="require('~/static/logo_white.svg')" 
                to="/">
            </nuxt-link>
            <button id="menu-burger" class="off" @click="toggleMenu">
                <svg 
                    class="h-8 w-8"
                    fill="none" stroke-linecap="round" 
                    stroke-linejoin="round" stroke-width="2" 
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>
            <div id="menu-container" class="off">
                <nuxt-link 
                tag="div"
                class="menu-element" 
                to="/profil">Profil
                </nuxt-link>
                <div class="menu-element"><a href="https://asvd.space/les-regles/">Règles</a></div>
                <div class="menu-element" @click="logout">Déconnexion</div>
            </div>
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
            toggleMenu(){
                $('#menu-container').toggleClass('on off');
                $('#menu-burger').toggleClass('on off');
            },
            turnOffMenu(){
                if($('#menu-burger').hasClass('on')){$('#menu-burger').removeClass('on')};
                $('#menu-burger').addClass('off');
                if($('#menu-container').hasClass('on')){$('#menu-container').removeClass('on')};
                $('#menu-container').addClass('off');
            },
            async logout(){
                try {
                    let user = await this.$auth.logout()
                    this.status = "Logout successful!"
                } catch (e) {
                    this.error = e.response.data.message
                    this.status = "Logout failed"
                }
                this.$router.push('/login')
            }
        },
        async fetch() { // Fetch when loading page
            this.resources = await fetch('/api/fakeAPI?api=GetCrewInfos')
            .then((res) => res.json())
            .then((data) => data.crewInfos.resources)
        },
    } 
</script>

<style>
    #layout {
        grid-template-rows: 80px 1fr 50px; 
    }
</style>

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
  }

  #metal .resource-logo{
      margin-right: 0.2rem;
  }
  
  #water .resource-logo{
      margin-right: 0.1rem;
  }

  #menu-burger{
      position: fixed;
      top: 0;
      right: 0;
      height: 55px;
      padding: 0.75em 1.2em 0.5em 1.2em;
      border-radius: 0;
      border:none;
      color:white;
  }

  #menu-burger.on svg{
      color: #00bebe;
  }

  #menu-burger.on{
      background-color: #172e61;
  }

  #menu-burger.off{
      background:none;
  }

  #menu-container.on{
      position: fixed;
      display: flex;
      flex-wrap: wrap;
      top: 55px;
      right: 0;
      width: 100%;
      background: #172e61;
      z-index: 100;

  }

  #menu-container.off{
      display: none;
  }

  .menu-element{
      color: #00bebe;
      position: relative;
      flex-basis: 100%;
      height: 60px;
      display: flex;
      text-transform: uppercase;
      justify-content: center;
      align-items: center;
  }

  .menu-element::after{
      content: "";
      position: absolute;
      bottom: -1px;
      width: 60%;
      max-width: 213px;
      height: 1px;
      background-color: #00bebe;
  }

  .menu-element:last-of-type::after{
      content: none;
  }
</style>