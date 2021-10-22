<template>
    <header id="header">
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
            <div class="menu-element" @click="logout">Déconnexion</div>
        </div>
    </header>
</template>

<script>
    export default{
        methods:{
            toggleMenu(){
                $('#menu-container').toggleClass('on off');
                $('#menu-burger').toggleClass('on off');
            },
            async logout(){
                try {
                    let user = await this.$auth.logout()
                    this.status = "Logout successful!"
                    this.$router.push('/')
                } catch (e) {
                    this.error = e.response.data.message
                    this.status = "Logout failed"
                }
            }
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