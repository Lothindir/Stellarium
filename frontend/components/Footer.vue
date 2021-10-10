<template>
    <footer id="footer">
        <NuxtLink class="galaxy" to="/" tag="img" :src="require('~/static/galaxy.svg')"></NuxtLink>
        <NuxtLink class="battleship" to="/ship" tag="img" :src="require('~/static/battleship.svg')"></NuxtLink>
        <NuxtLink class="research" to="/research" tag="img" :src="require('~/static/research.svg')"></NuxtLink>
        <NuxtLink class="challenges" to="/challenges" tag="img" :src="require('~/static/challenges.svg')"></NuxtLink>
        <NuxtLink class="scores" to="/scores" tag="img" :src="require('~/static/scores.svg')"></NuxtLink>
    </footer>
</template>
<style scoped>
    img {
        min-width: 30px;
        width: 14vw;
        max-width: 60px;
        opacity: 0.6;
    }

    .nuxt-link-exact-active{
        opacity: 1;
        filter: drop-shadow(0 0 1rem rgba(255,106,0,1));
    }
</style>