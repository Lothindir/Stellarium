<template>
    <footer @click="turnOffMenu">
        <section id="researchNav">
            <div class="researchNavElement active" id="culture" @click="showReseach('#culture')">
                <img :src="require('~/static/culture.svg')"/>
            </div>
            <div class="researchNavElement" id="military" @click="showReseach('#military')">
                <img :src="require('~/static/military.svg')"/>
            </div>
            <div class="researchNavElement" id="exploration" @click="showReseach('#exploration')">
                <img :src="require('~/static/exploration.svg')"/>
            </div>
            <div class="researchNavElement" id="production" @click="showReseach('#production')">
                <img :src="require('~/static/production.svg')"/>
            </div>
        </section>
        <section id="footer">
            <NuxtLink class="navElement" to="/" tag="img" :src="require('~/static/galaxy.svg')"></NuxtLink>
            <NuxtLink class="navElement" to="/ship" tag="img" :src="require('~/static/battleship.svg')"></NuxtLink>
            <NuxtLink class="navElement" to="/research" tag="img" :src="require('~/static/research.svg')"></NuxtLink>
            <NuxtLink class="navElement" to="/challenges" tag="img" :src="require('~/static/challenges.svg')"></NuxtLink>
            <NuxtLink class="navElement" to="/scores" tag="img" :src="require('~/static/scores.svg')"></NuxtLink>
        </section>
    </footer>
</template>

<script>
    export default{
        methods:{
            showReseach(research){
                $('.researchNavElement').removeClass('active')
                $(research).addClass('active')
                $('.researchContent').addClass('hidden')
                $(research+'Content').removeClass('hidden')
            },
            turnOffMenu(){
                if($('#menu-burger').hasClass('on')){$('#menu-burger').removeClass('on')};
                $('#menu-burger').addClass('off');
                if($('#menu-container').hasClass('on')){$('#menu-container').removeClass('on')};
                $('#menu-container').addClass('off');
            }
        }
    } 
</script>

<style scoped>

    #researchNav {
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        max-height: 50px;
    }

    #researchNav::after{
        content: "";
        position: absolute;
        bottom: 57px;
        width: 60%;
        max-width: 213px;
        height: 1px;
        background-color: rgba(255,255,255,0.2);
    }

    .researchNavElement {
        min-width: 30px;
        width: 14vw;
        max-width: 60px;
        opacity: 0.6;
    }

    #footer {
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        max-height: 50px;
        margin-top:20px;
    }

    .navElement {
        min-width: 30px;
        width: 14vw;
        max-width: 60px;
        opacity: 0.2;
    }

    .nuxt-link-exact-active, .researchNavElement.active{
        opacity: 1;
        filter: drop-shadow(0 0 1rem rgba(255,106,0,1));
    }
</style>