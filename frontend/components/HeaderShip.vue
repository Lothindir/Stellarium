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
        <section id="ship">
            <p v-if="$fetchState.pending">Recherch du vaisseau...</p>
            <p v-else-if="$fetchState.error">Impossible localiser le vaisseau</p>
            <div class="stat" id="attack">
                <img class="stat-logo" :src="require('~/static/attack.svg')"/>
                <p class="stat-value">{{this.ship.pa}}</p>
            </div>
            <div class="stat" id="fuel">
                <img class="stat-logo" :src="require('~/static/fuel.svg')"/>
                <p class="stat-value">{{this.carb.curr}}/{{this.carb.max}}</p>
            </div>
            <div class="stat" id="refill">
                <img class="stat-logo" :src="require('~/static/refill.svg')"/>
                <p class="stat-value">+{{this.ship.recharge}}</p>
            </div>
        </section>
    </header>
</template>

<script>
    export default{
        data() {
            return {
                ship: {},
                carb: {}
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
            this.ship = await fetch('/api/fakeAPI?api=GetShip')
            .then((res) => res.json())
            .then((data) => data.ship)
            this.carb = this.ship.carb
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
  
  #ship {
    display: flex;
    justify-content: space-around;
    align-content: space-around;
    grid-area: header;
    margin-top: 10px;
    padding: 0.2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.2);
  }

  .stat{
      display: flex;
      align-items: center;
  }

  #attack .stat-logo{
      margin-right: 0.4rem;
  }

  #fuel .stat-logo{
      margin-right: 0.5rem;
  }

  #refill .stat-logo{
      margin-right: 0.3rem;
  }

  .stat-logo{
      height: 1.4rem;
  }

  #fuel .stat-logo{
      height: 1.5rem;
  }

  .stellarium-logo{
      max-width: 60%;
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